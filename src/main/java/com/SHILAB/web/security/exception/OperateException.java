package com.SHILAB.web.security.exception;

@SuppressWarnings("serial")
public class OperateException extends RuntimeException {
	private Object extraInformation;

	public OperateException() {
	}

	public OperateException(String msg) {
		super(msg);
	}

	public OperateException(String msg, Object extraInformation) {
		super(msg);
		this.extraInformation = extraInformation;
	}

	public Object getExtraInformation() {
		return extraInformation;
	}

	public void clearExtraInformation() {
		this.extraInformation = null;
	}
}
