package org.angular.resource.demo.controller;

import org.angular.resource.demo.model.MyEntity;
import org.angular.resource.demo.repository.MyEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

/**
 * Created by andrey on 25.02.2016.
 */
@RestController
@RequestMapping(value = "/entity")
public class MyEntityController {
    @Autowired
    private MyEntityRepository repository;

    @RequestMapping(method = GET)
    public List<MyEntity> search() {
        return repository.findAll();
    }

    @RequestMapping(value = "/{id}", method = GET)
    public MyEntity search(@PathVariable Long id) {
        return repository.findOne(id);
    }

    @RequestMapping(method = POST)
    @ResponseStatus(HttpStatus.CREATED)
    public MyEntity create(@RequestBody @Valid MyEntity entity) {
        entity.id = null;
        return repository.saveAndFlush(entity);
    }

    @RequestMapping(value = "/{id}", method = POST)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public MyEntity update(@PathVariable Long id, @RequestBody @Valid MyEntity entity) {
        entity.id = id;
        return repository.saveAndFlush(entity);
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@RequestParam Long id) {
        repository.delete(id);
    }
}