package com.fshoes.core.admin.returns.service.impl;

import com.fshoes.core.admin.returns.model.request.GetBillRequest;
import com.fshoes.core.admin.returns.model.response.GetBillResponse;
import com.fshoes.core.admin.returns.repository.BillReturnRepository;
import com.fshoes.core.admin.returns.service.ReturnService;
import com.fshoes.core.common.PageReponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Calendar;

@Service
public class ReturnServiceImpl implements ReturnService {
    @Autowired
    private BillReturnRepository billRepository;

    @Override
    public PageReponse<GetBillResponse> getBill(GetBillRequest request) {
        // Lấy timestamp hiện tại
        Long currentDate = Calendar.getInstance().getTimeInMillis();

        // Trừ đi 7 ngày
        Calendar sevenDaysAgo = Calendar.getInstance();
        sevenDaysAgo.setTimeInMillis(currentDate);
        sevenDaysAgo.add(Calendar.DAY_OF_YEAR, -7);

        // Lấy timestamp sau khi trừ 7 ngày
        Long sevenDaysAgoTimestamp = sevenDaysAgo.getTimeInMillis();

        // Sử dụng sevenDaysAgoTimestamp trong phương thức của bạn
        Pageable pageable = PageRequest.of(request.getPage(), 5);
        return new PageReponse<>(billRepository.getBillReturn(request.getCodeBill(), sevenDaysAgoTimestamp, pageable));
    }
}
