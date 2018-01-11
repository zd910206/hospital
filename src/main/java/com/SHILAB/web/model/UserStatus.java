package com.SHILAB.web.model;

/**
 * 用户状态
 *
 * Locked 锁定
 *
 */

public enum UserStatus {
	LOCKED("Locked");
	
	private String value;
	
    private UserStatus(String value) {
      this.value = value;
    }

    @Override
    public String toString() {
      return String.valueOf(this.value);
    }
}
