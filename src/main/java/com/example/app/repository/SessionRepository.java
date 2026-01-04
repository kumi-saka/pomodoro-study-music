package com.example.app.repository;

import com.example.app.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

    // デバイスIDでセッションを取得（作成日時の降順）
    List<Session> findByDeviceIdOrderByCreatedAtDesc(String deviceId);

    // デバイスIDと完了フラグでセッションを取得
    List<Session> findByDeviceIdAndCompletedOrderByCreatedAtDesc(String deviceId, Boolean completed);

    // デバイスIDと日付範囲でセッションを取得
    @Query("SELECT s FROM Session s WHERE s.deviceId = :deviceId " +
           "AND s.createdAt >= :startDate AND s.createdAt < :endDate " +
           "ORDER BY s.createdAt DESC")
    List<Session> findByDeviceIdAndDateRange(
        @Param("deviceId") String deviceId,
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate
    );

    // 未完了のセッションを取得（最新の1件）
    Session findFirstByDeviceIdAndCompletedOrderByCreatedAtDesc(String deviceId, Boolean completed);
}

