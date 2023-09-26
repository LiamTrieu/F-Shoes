package com.fshoes.core.admin.khachhang.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fshoes.core.admin.khachhang.model.request.DiaChiRequest;
import com.fshoes.core.admin.khachhang.model.respone.DiaChiRespone;
import com.fshoes.core.admin.khachhang.model.respone.DistrictResponse;
import com.fshoes.core.admin.khachhang.model.respone.ProvinceRespone;
import com.fshoes.core.admin.khachhang.model.respone.WardResponse;
import com.fshoes.core.admin.khachhang.repository.DiaChiRepository;
import com.fshoes.core.admin.khachhang.repository.KhachHangRepository;
import com.fshoes.core.admin.khachhang.service.DiaChiService;
import com.fshoes.entity.Address;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class DiaChiServiceImpl implements DiaChiService {
    @Autowired
    private DiaChiRepository diaChiRepository;

    @Autowired
    private KhachHangRepository khachHangRepository;


    @Value("${api.ghn.token}")
    private String tokenApiGhn;

    @Value("${api.ghn.ShopId}")
    private String shopId;


    @Override
    public List<Address> getAll() {
        return diaChiRepository.findAll();
    }

    @Override
    public Page<DiaChiRespone> getAllAddressByIdCustomer(int p, String idCustomer) {
        Pageable pageable = PageRequest.of(p, 5);
        return diaChiRepository.getPageAddressByIdCustomer(pageable, idCustomer);
    }

    @Override
    public Address getOne(String id) {
        return diaChiRepository.findById(id).orElse(null);
    }

    @Override
    public Page<Address> getPage(int p) {
        Pageable pageable = PageRequest.of(p, 5);
        return diaChiRepository.findAll(pageable);
    }

    @Override
    public Address add(DiaChiRequest diaChiRequest) {
        try {
            Address address = diaChiRequest.newAddress(new Address());
            address.setType(false);
            address.setAccount(khachHangRepository.findById(diaChiRequest.getIdCustomer()).orElse(null));
            return diaChiRepository.save(address);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean update(String id, DiaChiRequest diaChiRequest) {
        Optional<Address> addressOptional = diaChiRepository.findById(id);
        if (addressOptional.isPresent()) {
            Address address = diaChiRequest.newAddress(addressOptional.get());
            diaChiRepository.save(address);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void delete(String id) {
        diaChiRepository.deleteById(id);
    }

    @Override
    public ResponseEntity<List<ProvinceRespone>> getAllProvince() {
        String uri = "https://online-gateway.ghn.vn/shiip/public-api/master-data/province";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("token", tokenApiGhn);
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(response.getBody());

                // Truy cập vào "data" array
                JsonNode dataArray = rootNode.get("data");

                // Kiểm tra xem "data" là một mảng và có ít nhất một phần tử

                if (dataArray.isArray()) {
                    List<ProvinceRespone> provinceResponeList = new ArrayList<>();
                    for (int i = 0; i < dataArray.size(); i++) {
                        JsonNode firstElement = dataArray.get(i);
                        int provinceID = firstElement.get("ProvinceID").asInt();
                        String provinceName = firstElement.get("ProvinceName").asText();
                        provinceResponeList.add(new ProvinceRespone(provinceID, provinceName));
                    }
                    return ResponseEntity.ok(provinceResponeList);

                } else {
                    System.out.println("Không có dữ liệu hoặc dữ liệu không phải là mảng.");
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> getAllDistrict(Integer idProvince) {
        String uri = "https://online-gateway.ghn.vn/shiip/public-api/master-data/district";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("token", tokenApiGhn);
        HttpEntity<?> entity = new HttpEntity<>(headers);

        // Thêm tham số idProvince vào URL để lấy danh sách quận/huyện cho tỉnh/thành phố cụ thể
        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(uri)
                .queryParam("province_id", idProvince);

        ResponseEntity<String> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(response.getBody());

                // Truy cập vào "data" array
                JsonNode dataArray = rootNode.get("data");

                // Kiểm tra xem "data" là một mảng và có ít nhất một phần tử
                if (dataArray.isArray()) {
                    List<DistrictResponse> districtResponseList = new ArrayList<>();
                    for (int i = 0; i < dataArray.size(); i++) {
                        JsonNode districtNode = dataArray.get(i);
                        int districtID = districtNode.get("DistrictID").asInt();
                        String districtName = districtNode.get("DistrictName").asText();
                        districtResponseList.add(new DistrictResponse(districtID, districtName));
                    }
                    return ResponseEntity.ok(districtResponseList);
                } else {
                    System.out.println("Không có dữ liệu hoặc dữ liệu không phải là mảng.");
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> getAllWard(Integer idDistrict) {
        String uri = "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("token", tokenApiGhn);
        HttpEntity<?> entity = new HttpEntity<>(headers);

        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(uri)
                .queryParam("district_id", idDistrict);

        ResponseEntity<String> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(response.getBody());

                // Truy cập vào "data" array
                JsonNode dataArray = rootNode.get("data");

                // Kiểm tra xem "data" là một mảng và có ít nhất một phần tử
                if (dataArray.isArray()) {
                    List<WardResponse> wardCodeList = new ArrayList<>();
                    for (int i = 0; i < dataArray.size(); i++) {
                        JsonNode districtNode = dataArray.get(i);
                        int wardCode = districtNode.get("WardCode").asInt();
                        String wardName = districtNode.get("WardName").asText();
                        wardCodeList.add(new WardResponse(wardCode, wardName));
                    }
                    return ResponseEntity.ok(wardCodeList);
                } else {
                    System.out.println("Không có dữ liệu hoặc dữ liệu không phải là mảng.");
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public Boolean updateDefault(String idCustomer, String idAdrress) {
        List<Address> addressList = diaChiRepository.getStatusAddressByIdCustomer(idCustomer);
        if(!addressList.isEmpty()) {
            for (Address address : addressList) {
                address.setType(false);
                if (address.getId().equals(idAdrress)) {
                    address.setType(true);
                }
                diaChiRepository.save(address);
            }
            return true;
        }
        return false;
    }
}
