package org.angular.resource.demo.model;

import javax.persistence.Column;
import javax.persistence.Table;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by andrey on 25.02.2016.
 */
@Entity
@Table(name = "entity")
public class MyEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "entity_id")
    public Long id;

    @Column(name = "title", nullable = false)
    public String title;

    @Column(name = "is_done", nullable = false)
    public Boolean isDone = false;

    @Override
    public String toString() {
        return "MyEntity{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", isDone=" + isDone +
                '}';
    }
}
