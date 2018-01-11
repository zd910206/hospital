package com.SHILAB.web.service.impl;


import com.SHILAB.web.base.util.CollectionUtils;
import com.SHILAB.web.base.util.DBUtils;
import com.SHILAB.web.mapper.UserMapper;
import com.SHILAB.web.model.User;
import com.SHILAB.web.security.Md5PwdEncoder;
import com.SHILAB.web.security.exception.*;
import com.SHILAB.web.service.IUserService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * 用户管理服务接口实现
 *
 * @author ZD
 */
@Transactional
@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private Md5PwdEncoder pwdEncoder;

    /**
     * 获取用户列表
     *
     * @param page 列表页数
     * @param rows 每页多少行
     * @return
     */
    @Override
    public List<User> list(Integer page, Integer rows) {
        return userMapper.queryUserList(DBUtils.getPaginationParams(page, rows, true));
    }

    /**
     * 添加用户
     *
     * @param u User对象
     * @throws AddException
     * @throws NameExistException
     */
    @Override
    public void add(User u) throws AddException, NameExistException {
        try {
            if (u != null) {
                User user = userMapper.queryByUserName(u.getUserName());
                if (user != null) {//用户名已存在
                    throw new NameExistException("用户名已存在！");
                }
                u.setPassword(pwdEncoder.encodePassword(u.getPassword()));
            }
            userMapper.saveUser(u);
        } catch (AddException e) {
            throw new AddException("Failed to add user.");
        }
    }

    /**
     * 修改用户
     *
     * @param u User对象
     * @throws ModifyException
     */
    @Override
    public void modify(User u) throws ModifyException {
        try {
            User user = userMapper.queryByUserId(u.getUserId());
            if (u != null && !StringUtils.isEmpty(u.getPassword())) {
                if (!user.getPassword().equals(u.getPassword())) {//页面上显示的是加密后的密码
                    u.setPassword(pwdEncoder.encodePassword(u.getPassword()));
                }
            } else
                //如果没有改变，则表示不修改密码
                u.setPassword(user.getPassword());
            userMapper.updateUser(u);
        } catch (Exception e) {
            throw new ModifyException("Failed to update user.");
        }
    }

    /**
     * 删除用户
     *
     * @param objs List删除多个
     * @throws DeleteException
     */
    @Override
    public void delete(List<Object> objs) throws DeleteException {
        try {
            userMapper.deleteUser(objs);
        } catch (DeleteException e) {
            throw new DeleteException("Failed to delete user.");
        }
    }

    /**
     * 统计用户数
     *
     * @return
     */
    @Override
    public int getTotalRows() {
        return userMapper.queryUserRows();
    }

    /**
     * 查询用户
     *
     * @return
     */
    @Override
    public List<User> getUserList() {
        return null;
    }

    /**
     * 修改用户登录时间
     *
     * @param user
     */
    @Override
    public void updataLoginTime(User user) {
        userMapper.saveLoginTime(user);
    }

    /**
     * 修改用户密码
     *
     * @param userId 用户ID
     * @param oldPwd 输入的旧密码
     * @param newPwd 新密码
     * @throws ModifyException
     * @throws BadCredentialsException
     */
    @Override
    public void modifyPwd(String userId, String oldPwd, String newPwd)
            throws ModifyException, BadCredentialsException {
        Map<String, Object> params = CollectionUtils.newHashMap();
        try {
            params.put("userId", userId);
            String encPass = userMapper.queryByField(params).get(0).getPassword();
            if (!pwdEncoder.isPasswordValid(encPass, oldPwd)) {
                throw new BadCredentialsException("旧密码错误！");
            } else {
                User u = new User();
                u.setUserId(Integer.parseInt(userId));
                u.setPassword(pwdEncoder.encodePassword(newPwd));
                userMapper.updateUser(u);
            }
        } catch (ModifyException e) {
            throw new ModifyException("Failed to modify password.");
        }

    }

    @Override
    public User getUserByUserId(Integer userId) {
        return userMapper.queryByUserId(userId);
    }

    @Override
    public List<User> getUserByField(Map<String, Object> params) {
        return userMapper.queryByField(params);
    }

    @Override
    public List<User> getUserNotAdmin(Map<String, Object> params) {
        return userMapper.queryUserNotAdmin(params);
    }

    @Override
    public List<User> getUserList(Integer offset, Integer limit, String userName, Integer userType) {
        Map<String, Object> params = DBUtils.getPaginationParams(offset, limit, false);
        if (!StringUtils.isEmpty(userName)) {
            params.put("userName", userName);
        }
        if (userType != null) {
            params.put("userType", userType);
        }
        List<User> userList = userMapper.queryUserList(params);
        return userList;
    }

}
