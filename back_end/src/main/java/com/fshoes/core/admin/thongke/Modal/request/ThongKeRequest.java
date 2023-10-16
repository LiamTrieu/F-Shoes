package com.fshoes.core.admin.thongke.Modal.request;

import com.fshoes.util.DateUtil;
import lombok.Getter;
import lombok.Setter;

import java.text.ParseException;

@Getter
@Setter
public class ThongKeRequest {
    private String startDate;
    private String endDate;

    public Long converDateThongke(String dateThongke) throws ParseException {
        return DateUtil.parseDateTimeLong(dateThongke);
    }
}
