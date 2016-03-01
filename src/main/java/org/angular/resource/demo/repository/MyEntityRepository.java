package org.angular.resource.demo.repository;

import org.angular.resource.demo.model.MyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by andrey on 25.02.2016.
 */
public interface MyEntityRepository extends JpaRepository<MyEntity, Long> {
}