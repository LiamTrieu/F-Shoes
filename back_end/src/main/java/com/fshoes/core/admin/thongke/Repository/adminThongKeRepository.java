package com.fshoes.core.admin.thongke.Repository;

import com.fshoes.core.admin.thongke.Modal.Response.DoanhThuResponse;
import com.fshoes.core.admin.thongke.Modal.Response.GetListProductInMonthResponse;
import com.fshoes.core.admin.thongke.Modal.Response.ThongKeSanPhamResponse;
import com.fshoes.core.admin.thongke.Modal.request.GetListProductMountRequest;
import com.fshoes.repository.BillDetailRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface adminThongKeRepository extends BillDetailRepository {

    @Query(value = """
            SELECT
            CONCAT(p.name, ' - ', c.name, ' - ', m.name, ' - ', s.name, ' - ', ca.name, ' - ', br.name) as nameProduct,
            MAX(pd.price) as price,
            GROUP_CONCAT(DISTINCT i.url) as image,
            GROUP_CONCAT(DISTINCT si.size) as size,
            Sum(bd.quantity) as quantity
            FROM bill_detail bd
            JOIN bill b ON bd.id_bill = b.id
            JOIN product_detail pd ON bd.id_product_detail = pd.id
            JOIN product p ON p.id = pd.id_product
            JOIN color c ON c.id = pd.id_color
            JOIN category ca ON ca.id = pd.id_category
            JOIN brand br ON br.id = pd.id_brand
            JOIN sole s ON s.id = pd.id_sole
            JOIN material m ON m.id = pd.id_material
            JOIN size si ON si.id = pd.id_size
            LEFT JOIN image i ON pd.id = i.id_product_detail
            WHERE
            b.status = 7
            AND bd.status != 1
            AND DATE(FROM_UNIXTIME(b.complete_date / 1000)) = DATE(CURDATE())
            GROUP BY p.id, c.id,m.id,s.id,ca.id,br.id
            ORDER BY Sum(bd.quantity) DESC;
            """, nativeQuery = true)
    Page<GetListProductInMonthResponse> getProductInDay(GetListProductMountRequest request, Pageable pageable);

    @Query(value = """
            SELECT
            CONCAT(p.name, ' - ', c.name, ' - ', m.name, ' - ', s.name, ' - ', ca.name, ' - ', br.name) as nameProduct,
            MAX(pd.price) as price,
            GROUP_CONCAT(DISTINCT i.url) as image,
            GROUP_CONCAT(DISTINCT si.size) as size,
            Sum(bd.quantity) as quantity
            FROM bill_detail bd
            JOIN bill b ON bd.id_bill = b.id
            JOIN product_detail pd ON bd.id_product_detail = pd.id
            JOIN product p ON p.id = pd.id_product
            JOIN color c ON c.id = pd.id_color
            JOIN category ca ON ca.id = pd.id_category
            JOIN brand br ON br.id = pd.id_brand
            JOIN sole s ON s.id = pd.id_sole
            JOIN material m ON m.id = pd.id_material
            JOIN size si ON si.id = pd.id_size
            LEFT JOIN image i ON pd.id = i.id_product_detail
            WHERE
            b.status = 7
            AND bd.status != 1
            AND YEARWEEK(FROM_UNIXTIME(b.complete_date / 1000)) = YEARWEEK(CURDATE())
            GROUP BY p.id, c.id,m.id,s.id,ca.id,br.id
            ORDER BY Sum(bd.quantity) DESC;
            """, nativeQuery = true)
    Page<GetListProductInMonthResponse> getProductInWeek(GetListProductMountRequest request, Pageable pageable);

    @Query(value = """
            SELECT
            CONCAT(p.name, ' - ', c.name, ' - ', m.name, ' - ', s.name, ' - ', ca.name, ' - ', br.name) as nameProduct,
            MAX(pd.price) as price,
            GROUP_CONCAT(DISTINCT i.url) as image,
            GROUP_CONCAT(DISTINCT si.size) as size,
            Sum(bd.quantity) as quantity
            FROM bill_detail bd
            JOIN bill b ON bd.id_bill = b.id
            JOIN product_detail pd ON bd.id_product_detail = pd.id
            JOIN product p ON p.id = pd.id_product
            JOIN color c ON c.id = pd.id_color
            JOIN category ca ON ca.id = pd.id_category
            JOIN brand br ON br.id = pd.id_brand
            JOIN sole s ON s.id = pd.id_sole
            JOIN material m ON m.id = pd.id_material
            JOIN size si ON si.id = pd.id_size
            LEFT JOIN image i ON pd.id = i.id_product_detail
            WHERE
            b.status = 7
            AND bd.status != 1
            AND DATE_FORMAT(FROM_UNIXTIME(b.complete_date / 1000), '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m')
            GROUP BY p.id, c.id,m.id,s.id,ca.id,br.id
            ORDER BY Sum(bd.quantity) DESC;
            """, nativeQuery = true)
    Page<GetListProductInMonthResponse> getProductInMonth(GetListProductMountRequest request, Pageable pageable);

    @Query(value = """
            SELECT
            CONCAT(p.name, ' - ', c.name, ' - ', m.name, ' - ', s.name, ' - ', ca.name, ' - ', br.name) as nameProduct,
            MAX(pd.price) as price,
            GROUP_CONCAT(DISTINCT i.url) as image,
            GROUP_CONCAT(DISTINCT si.size) as size,
            Sum(bd.quantity) as quantity
            FROM bill_detail bd
            JOIN bill b ON bd.id_bill = b.id
            JOIN product_detail pd ON bd.id_product_detail = pd.id
            JOIN product p ON p.id = pd.id_product
            JOIN color c ON c.id = pd.id_color
            JOIN category ca ON ca.id = pd.id_category
            JOIN brand br ON br.id = pd.id_brand
            JOIN sole s ON s.id = pd.id_sole
            JOIN material m ON m.id = pd.id_material
            JOIN size si ON si.id = pd.id_size
            LEFT JOIN image i ON pd.id = i.id_product_detail
            WHERE
            b.status = 7
            AND bd.status != 1
            AND DATE_FORMAT(FROM_UNIXTIME(b.complete_date / 1000), '%Y') = DATE_FORMAT(CURDATE(), '%Y')
            GROUP BY p.id, c.id,m.id,s.id,ca.id,br.id
            ORDER BY Sum(bd.quantity) DESC;
            """, nativeQuery = true)
    Page<GetListProductInMonthResponse> getProductInYear(GetListProductMountRequest request, Pageable pageable);


    @Query(value = """
                WITH DailySales AS (
                    SELECT
                        DATE(FROM_UNIXTIME(b.complete_date / 1000)) AS sale_date,
                        SUM(b.total_money) AS daily_total_sales,
                        COUNT(DISTINCT b.id) AS daily_order_count,
                        SUM(bd.quantity) AS daily_product_sold
                    FROM
                        bill b
                    JOIN
                        bill_detail bd ON b.id = bd.id_bill
                    WHERE
                        DATE(FROM_UNIXTIME(b.complete_date / 1000)) = DATE(CURDATE())
                        AND b.status = 7
                    GROUP BY
                        sale_date
                ), WeeklySales AS (
                     SELECT
                         DATE(FROM_UNIXTIME(b2.complete_date / 1000)) AS sale_date,
                         SUM(b2.total_money) AS weekly_total_sales,
                         COUNT(DISTINCT b2.id) AS weekly_order_count,
                         SUM(bd2.quantity) AS weekly_product_sold
                     FROM
                         bill b2
                     JOIN
                         bill_detail bd2 ON b2.id = bd2.id_bill
                     WHERE
                         YEARWEEK(FROM_UNIXTIME(b2.complete_date / 1000)) = YEARWEEK(CURDATE())
                         AND b2.status = 7
                     GROUP BY
                         sale_date
                 ), MonthlySales AS (
                    SELECT
                        DATE_FORMAT(FROM_UNIXTIME(b3.complete_date / 1000), '%Y-%m') AS sale_month,
                        SUM(b3.total_money) AS monthly_total_sales,
                        COUNT(DISTINCT b3.id) AS monthly_order_count,
                        SUM(bd3.quantity) AS monthly_product_sold
                    FROM
                        bill b3
                    JOIN
                        bill_detail bd3 ON b3.id = bd3.id_bill
                    WHERE
                        DATE_FORMAT(FROM_UNIXTIME(b3.complete_date / 1000), '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m')
                        AND b3.status = 7
                    GROUP BY
                        sale_month
                ), YearlySales AS (
                    SELECT
                        DATE_FORMAT(FROM_UNIXTIME(b4.complete_date / 1000), '%Y') AS sale_year,
                        SUM(b4.total_money) AS yearly_total_sales,
                        COUNT(DISTINCT b4.id) AS yearly_order_count,
                        SUM(bd4.quantity) AS yearly_product_sold
                    FROM
                        bill b4
                    JOIN
                        bill_detail bd4 ON b4.id = bd4.id_bill
                    WHERE
                        DATE_FORMAT(FROM_UNIXTIME(b4.complete_date / 1000), '%Y') = DATE_FORMAT(CURDATE(), '%Y')
                        AND b4.status = 7
                    GROUP BY
                        sale_year
                )
                SELECT
                    DATE(CURDATE()) AS 'ngayHienTai',
                    COALESCE(DS.daily_total_sales, 0) AS 'doanhSoNgay',
                    COALESCE(DS.daily_order_count, 0) AS 'soDonHangNgay',
                    COALESCE(DS.daily_product_sold, 0) AS 'soLuongSanPhamNgay',
                    DATE(CURDATE() - INTERVAL 1 DAY) AS 'homQua',
                    COALESCE(WS.weekly_total_sales, 0) AS 'doanhSoTuanNay',
                    COALESCE(WS.weekly_order_count, 0) AS 'soDonHangTuanNay',
                    COALESCE(WS.weekly_product_sold, 0) AS 'soLuongSanPhamTuanNay',
                    DATE_FORMAT(CURDATE(), '%Y-%m') AS 'thangNay',
                    COALESCE(MS.monthly_total_sales, 0) AS 'doanhSoThangNay',
                    COALESCE(MS.monthly_order_count, 0) AS 'soDonHangThangNay',
                    COALESCE(MS.monthly_product_sold, 0) AS 'soLuongSanPhamThangNay',
                    DATE_FORMAT(CURDATE(), '%Y') AS 'namNay',
                    COALESCE(YS2.yearly_total_sales, 0) AS 'doanhSoNamNay',
                    COALESCE(YS2.yearly_order_count, 0) AS 'soDonHangNamNay',
                    COALESCE(YS2.yearly_product_sold, 0) AS 'soLuongSanPhamNamNay'
                FROM (SELECT 1) dummy
                LEFT JOIN DailySales DS ON 1 = 1
                LEFT JOIN WeeklySales WS ON 1 = 1
                LEFT JOIN MonthlySales MS ON 1 = 1
                LEFT JOIN YearlySales YS2 ON 1 = 1;
            """, nativeQuery = true)
    List<DoanhThuResponse> getDoanhThu();

    @Query(value = """
            SELECT b.status as status, COUNT(b.id) as soLuong
            FROM bill b
            GROUP BY b.status
            ORDER BY b.status ASC
            """, nativeQuery = true)
    List<ThongKeSanPhamResponse> getThongKeDonhang();
}
