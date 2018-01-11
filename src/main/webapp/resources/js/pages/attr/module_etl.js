/*文件抽取*/
function openExtractFile(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '文件抽取', ctx + 'step/config/extract', 'extract', imgUrl);
}

/*hive外部表入库*/
function openHiveAttrEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        'Hive外部表入库', ctx + 'step/config/import_hive_param', 'import_hive', imgUrl);
}

/*数据预处理*/
function openPretreatAttrEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    GLOB.dlg.extractFileDlg = parent.xBoxy(ctx + 'pages/attr/pretreat.jsp', {
        stepId: stepId,
        taskId: taskId,
        flowId: flowId,
        taskStepId: taskStepId
    }, {
        title: "数据预处理"
    }, function () {
        parent.pretreat_init();
    });
}

/*数据汇总*/
function openCollectAttrEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '数据汇总', ctx + 'step/config/collect_param', 'view', imgUrl);
}

/*hive数据汇总*/
function openHiveCollectAttrEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    GLOB.dlg.hivecollectDlg = parent.xBoxy(ctx + 'pages/attr/hivecollect.jsp', {
        stepId: stepId,
        taskId: taskId,
        flowId: flowId,
        taskStepId: taskStepId
    }, {
        title: "hive数据汇总"
    }, function () {
        parent.hivecollect_init();
    });
}

/*数据同步*/
function openDataSyncAttrEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '数据同步', ctx + 'step/config/datasync_param', 'synchronous', imgUrl);
}

/*数据清洗*/
function openDataCleaningEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '数据清洗', ctx + 'step/config/datacleaning_param', 'datacleaning', imgUrl);
}

/*本地文件入库*/
function openLocalImportHiveEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '本地文件入库', ctx + 'step/config/local_import_hive_param', 'local_import_hive', imgUrl);
}

/*Hive出库到本地文件*/
function openHiveToLocalFile(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        'Hive出库到本地文件', ctx + 'step/config/hive_import_local_param', 'hive_import_local', imgUrl);
}

/*标签生成*/
function openLabelEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '标签生成', ctx + 'step/config/label_generate_param', 'label_generate', imgUrl);
}

/*ftp上传*/
function openFtpToolEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        'ftp上传', ctx + 'step/config/ftp_upload_param', 'ftp_upload', imgUrl);
}

/*时间序列*/
function openTimeSeriesEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '时间序列', ctx + 'step/config/time_series_param', null, imgUrl);
}

/*预测控制*/
function openPredictiveControlEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    var componentTitles = ['时间序列预测', '智能控制'];
    var componentUrls = [ctx + 'step/config/predictive_control_param', ctx + 'step/config/intelligent_control_param'];
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        componentTitles, componentUrls, null, imgUrl);
}

/*多粒度时间序列预测控制*/
function openMultiGranularityPredictiveControlEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    var componentTitles = ['多粒度时间序列预测', '智能控制'];
    var componentUrls = [ctx + 'step/config/multi_granularity_predictive_control_param', ctx + 'step/config/intelligent_control_param'];
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        componentTitles, componentUrls, null, imgUrl);
}

/*设备状态得分预测*/
function openScoreForecastEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '设备状态得分预测', ctx + 'step/config/score_forecast_param', null, imgUrl);
}

/*轮保得分预测*/
function openLbScoreForecastEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
//	showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
//			'轮保得分预测', ctx + 'step/config/lb_score_forecast_param', null, imgUrl);
    var componentTitles = ['轮保得分预测', 'SVM参数优化'];
    var componentUrls = [ctx + 'step/config/lb_score_forecast_param', ctx + 'step/config/svm_parameter_optimization_param'];
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        componentTitles, componentUrls, null, imgUrl);
}

/*滑窗统计*/
function openSlidingWindowStatisticsEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '滑窗统计', ctx + 'step/config/sliding_window_statistics_param', null, imgUrl);
}

/*MTBF*/
function openMtbfEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        'MTBF', ctx + 'step/config/mtbf_param', null, imgUrl);
}

/*安全库存*/
function openSafetyStockEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '安全库存', ctx + 'step/config/safety_stock_param', null, imgUrl);
}

/*备件生命周期*/
function openSafetyStockEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '备件生命周期', ctx + 'step/config/life_cycle_param', null, imgUrl);
}

/*SVM模型训练（烟草）*/
function openTobaccoSvmTrainingEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    var componentTitles = ['SVM模型训练(烟草)', 'SVM参数优化', '抽样方式'];
    var componentUrls = [ctx + 'step/config/tobacco_svm_training_param', ctx + 'step/config/svm_parameter_optimization_param', ctx + 'step/config/sampling_method_param'];
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        componentTitles, componentUrls, null, imgUrl);
}

/*SVM预测控制（烟草）*/
function openTobaccoPredictiveControlEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    var componentTitles = ['SVM预测控制(烟草)', '智能控制'];
    var componentUrls = [ctx + 'step/config/tobacco_predictive_control_param', ctx + 'step/config/intelligent_control_param'];
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        componentTitles, componentUrls, null, imgUrl);
}
/////////////////////////////////////////////////////////////////////ETL END HERE//////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////DATAMINE START HERE///////////////////////////////////////

/*可变文件输入*/
function openDMInputFileEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '可变文件输入', ctx + 'step/config/dm/input_file_param', 'view', imgUrl);
}

/*字段类型*/
function openDMFieldTypeEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '类型', ctx + 'step/config/dm/field_type_param', 'fieldType', imgUrl);
}

/*分区*/
function openDMPartitionEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '分区', ctx + 'step/config/dm/partition_param', 'view', imgUrl);
}

/*抽样*/
function openDMSampleEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '抽样', ctx + 'step/config/dm/sample_param', 'view', imgUrl);
}

/*选择*/
function openDMSelectEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '选择', ctx + 'step/config/dm/select_param', 'view', imgUrl);
}

/*转换*/
function openDMTransformEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '转换', ctx + 'step/config/dm/transform_param', 'transform', imgUrl);
}

/*C&R(classification and regression)*/
function openDMCREdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        'C&R', ctx + 'step/config/dm/cr_param', 'view', imgUrl);
}

/*离散化*/
function openDMDiscretizationEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '离散化', ctx + 'step/config/dm/discretization_param', 'discretization', imgUrl);
}

/*导出*/
function openDMExportEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '导出', ctx + 'step/config/dm/export_param', 'export', imgUrl);
}

/*字段转换*/
function openDMFieldConversionEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '字段转换', ctx + 'step/config/dm/conversion_param', 'conversion', imgUrl);
}

/*填充*/
function openDMFillEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '填充', ctx + 'step/config/dm/fill_param', 'fill', imgUrl);
}

/*审核*/
function openDMAuditEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '审核', ctx + 'step/config/dm/audit_param', 'view', imgUrl);
}

/*树状图形*/
function openDMOutputTreeEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl, cycle) {
    //var params = 'stepId=' + stepId + '&parentId=' + parentId + '&flowId=' + flowId + '&taskId=' + taskId + '&taskStepId=' + taskStepId + '&cycle=' + cycle;
    //StageDialog({
    //    method: 'iframe',
    //    url: ctx + 'task/result/tree?' + params,
    //    title: "树状图形",
    //    imgUrl: imgUrl,
    //    height: '450px',
    //    showFooter: false
    //});
    getTaskStateByTaskIdAndStepId(showComponentModal, true, stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '树状图形', ctx + 'task/result/tree', 'tree', imgUrl, true, true, true);
}

/*评估*/
function openDMOutputEvaluateEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight) {
    GLOB.dlg.dmEvaluateDlg = parent.xBoxy(ctx + 'pages/attr/dm/evaluate.jsp', {
        parentId: parentId,
        stepId: stepId,
        taskId: taskId,
        flowId: flowId,
        taskStepId: taskStepId
    }, {
        title: "评估"
    }, function () {
        //parent.evaluate_init();
    });
}

/*分析*/
function openDMOutputAnalysisEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    //var params = 'stepId=' + stepId + '&parentId=' + parentId + '&flowId=' + flowId + '&taskId=' + taskId + '&taskStepId=' + taskStepId;
    //StageDialog({
    //    method : 'iframe',
    //    url : ctx + 'task/result/dm/analysis?' + params,
    //    title : "分析",
    //    imgUrl : imgUrl,
    //    height : '450px',
    //    showFooter: false
    //});
    getTaskStateByTaskIdAndStepId(showComponentModal, true, stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '分析', ctx + 'task/result/dm/analysis', 'analysis', imgUrl, true, true, true);
}

/*表格*/
function openDMOutputTableEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    //var params = 'stepId=' + stepId + '&parentId=' + parentId + '&flowId=' + flowId + '&taskId=' + taskId + '&taskStepId=' + taskStepId;
    //StageDialog({
    //    method: 'iframe',
    //    url: ctx + 'task/result/dm/table?' + params,
    //    title: "表格",
    //    imgUrl: imgUrl,
    //    height: '450px',
    //    showFooter: false
    //});
    getTaskStateByTaskIdAndStepId(showComponentModal, true, stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '表格', ctx + 'task/result/dm/table', 'table', imgUrl, true, true, true);
}

/*逻辑回归*/
function openDMLogisticRegressionEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '逻辑回归', ctx + 'step/config/dm/logistic_regression_param', 'fill', imgUrl);
}

/*逻辑回归*/
function openDMLogisticRegressionMineEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight) {
    GLOB.dlg.dmLogisticRegressionMineDlg = parent.xBoxy(ctx + 'pages/attr/dm/logistic_regression_mine.jsp', {
        parentId: parentId,
        stepId: stepId,
        taskId: taskId,
        flowId: flowId,
        taskStepId: taskStepId
    }, {
        title: "逻辑回归"
    }, function () {
        parent.logistic_regression_mine_init();
    });
}

/*线性回归*/
function openDMLinearEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '线性回归', ctx + 'step/config/dm/linear_param', 'view', imgUrl);
}

/*方程式*/
function openDMEquationEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    //var params = 'stepId=' + stepId + '&parentId=' + parentId + '&flowId=' + flowId + '&taskId=' + taskId + '&taskStepId=' + taskStepId;
    //StageDialog({
    //    method: 'iframe',
    //    url: ctx + 'task/result/dm/equation?' + params,
    //    title: "方程式",
    //    imgUrl: imgUrl,
    //    height: '450px',
    //    showFooter: false
    //});
    getTaskStateByTaskIdAndStepId(showComponentModal, true, stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '方程式', ctx + 'task/result/dm/equation', 'equation', imgUrl, true, true, true);
}

/*平面文件*/
function openDMFlatFileEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight) {
    GLOB.dlg.dmFlatFileDlg = parent.xBoxy(ctx + 'pages/attr/dm/flat_file.jsp', {
        parentId: parentId,
        stepId: stepId,
        taskId: taskId,
        flowId: flowId,
        taskStepId: taskStepId
    }, {
        title: "平面文件"
    }, function () {
        //parent.flat_file_init();
    });
}

/*文本分类*/
function openDMTextClassifyEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '文本分类', ctx + 'step/config/text_classify_param', 'view', imgUrl);
}

/*文本分类模型*/
function openDMTextClassifyModelEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '文本分类模型', ctx + 'step/config/text_classify_model_param', 'view', imgUrl);
}

/*过滤*/
function openDMFilterEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight) {
    GLOB.dlg.dmFilterDlg = parent.xBoxy(ctx + 'pages/attr/dm/filter.jsp', {
        parentId: parentId,
        stepId: stepId,
        taskId: taskId,
        flowId: flowId,
        taskStepId: taskStepId
    }, {
        title: "过滤"
    }, function () {
        parent.filter_init();
    });
}

/*文本分类*/
function openDMTextClassifyEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '文本分类', ctx + 'step/config/text_classify_param', 'view', imgUrl);
}

/*文本分类模型*/
function openDMTextClassifyModelEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '文本分类模型', ctx + 'step/config/text_classify_model_param', 'view', imgUrl);
}

/*爬虫*/
function openCrawlEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '爬虫', ctx + 'step/config/crawl_param', null, imgUrl);
}

/*数据同步外部表导出*/
function openDbDumpEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '外部表导出', ctx + 'step/config/dbdump_param', 'dbdump', imgUrl);
}

/*数据同步外部表导入*/
function openDbImpEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '外部表导入', ctx + 'step/config/dbimp_param', 'dbimp', imgUrl);
}

/*溯源分析*/
function openSimilarityEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '溯源分析', ctx + 'step/config/similarity_param', 'similarity', imgUrl);
}

/*数据发布*/
function openDMreleasedEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '数据发布', ctx + 'step/config/dm/released_param', 'released', imgUrl);
}

/*Hbase导出*/
function openHbaseExportEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        'HBASE导出', ctx + 'step/config/dm/hbaseExport_param', 'hbaseExport', imgUrl);
}

/*DB数据源*/
function openDatabaseEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        'DB数据源', ctx + 'step/config/dm/database_param', 'database', imgUrl);
}

/*Sqoop输入*/
function openSqoopInputEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        'Sqoop输入', ctx + 'step/config/dm/sqoopInput', 'sqoop', imgUrl);
}

/*数据采集*/
function openDataCollectorEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '数据采集', ctx + 'step/config/dm/data_collector_param', 'extract', imgUrl);
}

/*应用*/
function openApplyEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '应用', ctx + 'step/config/dm/apply_param', 'extract', imgUrl);
}

/*HBase数据库*/
function openHbaseEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        'HBase数据库', ctx + 'step/config/dm/hbase_param', 'database', imgUrl);
}

/*重命名组建*/
function openMoveFileEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '文件转移', ctx + 'step/config/rename_param', 'rename', imgUrl);
}

/*GP入库*/
function openImportGpEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        'GP入库', ctx + 'step/config/impgp_param', 'impgp', imgUrl);
}

/*执行存储过程*/
function openProcedureEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        'DB存储过程', ctx + 'step/config/procedure_param', 'procedure', imgUrl);
}

/*执行存储过程*/
function openDbCollectEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        'DB数据汇总', ctx + 'step/config/dbcollect_param', 'dbcollect', imgUrl);
}

/*执行Shell脚本*/
function openShellCmdEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        'Shell脚本', ctx + 'step/config/shellcmd_param', 'shellcmd', imgUrl);
}

/*文件等待*/
function openWaitForFileArriveEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '文件等待', ctx + 'step/config/wait_file_arrive', 'shellcmd', imgUrl);
}

/*发布到DB*/
function openPublishDBEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    var componentTitles = ['发布到DB', '组件参数'];
    var componentUrls = [ctx + 'step/config/publish_db_param', ctx + 'step/config/publish_db_setting'];
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        componentTitles, componentUrls, 'publish_hbase', imgUrl);
}

/*子流程*/
function openChildFlowEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    var componentTitle = '子流程';
    var componentUrl = ctx + 'step/config/child_flow_param';
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        componentTitle, componentUrl, null, imgUrl, true);
}

/*累计打点*/
function openRBIEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    var componentTitle = '累计打点';
    var componentUrl = ctx + 'step/config/rbi_param';
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        componentTitle, componentUrl, null, imgUrl, false);
}

/*数据挖掘模型应用*/
function openModelApplicationEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    var componentTitle = '模型应用';
    var componentUrl = ctx + 'step/config/dm/model_application_param';
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        componentTitle, componentUrl, "modelApplication", imgUrl, false);
}

/*kmeans*/
function openKmeansEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    var componentTitle = 'KMeans';
    var componentUrl = ctx + 'step/config/dm/kmeans_param';
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        componentTitle, componentUrl, null, imgUrl, false);
}

/*一元时间序列*/
function openUnitTimeSeriesEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    var componentTitle = '一元时间序列';
    var componentUrl = ctx + 'step/config/dm/unit_time_series_param';
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        componentTitle, componentUrl, null, imgUrl, false);
}

/*多元时间序列*/
function openMultiTimeSeriesEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    var componentTitle = '多元时间序列';
    var componentUrl = ctx + 'step/config/dm/multi_time_series_param';
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        componentTitle, componentUrl, null, imgUrl, false);
}

/*MTBF*/
function openDmMTBFEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    var componentTitle = 'MTBF';
    var componentUrl = ctx + 'step/config/dm/mtbf_param';
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        componentTitle, componentUrl, null, imgUrl, false);
}

/**
 * Netty通信
 */
function openNettyEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight, 'Netty网络服务',
        ctx + 'step/config/netty_param', null, imgUrl, false);
}

/*滑窗统计*/
function openDmSlidingWindowStatisticsEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    var componentTitle = '滑窗统计';
    var componentUrl = ctx + 'step/config/dm/sliding_window_statistics_param';
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        componentTitle, componentUrl, null, imgUrl, false);
}

/*文本分类*/
function openDmTextCategorizationEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    var componentTitle = '文本分类';
    var componentUrl = ctx + 'step/config/dm/text_categorization_param';
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        componentTitle, componentUrl, null, imgUrl, false);
}

////////////////////////////////////////////////////////////
///流处理组件
////////////////////////////////////////////////////////////

/**
 * 文本分类
 */
function openStreamTextClassifyEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        '文本分类', ctx + 'step/stream/config/text_classify_param', null, imgUrl);
}
/*SVM模型训练*/
function openSVMTrainingEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    var componentTitles = 'SVM模型训练';
    var componentUrls =  ctx + 'step/config/svm_training_parameter';
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        componentTitles, componentUrls, "svmTraining", imgUrl);
}
/**SVM模型应用*/
function openSVMTrainingApplyEdit(stepId, parentId, taskId, flowId, taskStepId, flowRight, imgUrl) {
    var componentTitles = 'SVM模型应用';
    var componentUrls =  ctx + 'step/config/svm_training_apply_parameter';
    showComponentModal(stepId, parentId, taskId, flowId, taskStepId, flowRight,
        componentTitles, componentUrls, "svmTrainingApply", imgUrl);
}

// 除了共用的tab页，如果组件配置有多个tab页，SEE openPublishDBEdit。
// 除了共用的tab页，如果组件配置页面只有一个tab页，SEE openExtractFile。
/**
 * @param stepId 环节Id
 * @param parentId 环节的父Id
 * @param taskId 任务Id
 * @param taskStepId 任务环节Id
 * @param flowRight 流程权限
 * @param componentTitles 组件tab对应的title
 * @param componentUrls 组件tab对应的url
 * @param logAct 日志，如果不需要显示日志，将logAct赋值为空，即null、undefined...
 * @param imgUrl 组件图片，在模态框左上角显示
 * @param simple 只显示组件配置，不显示其它公共配置
 * @param onlyShowLog 只显示日志，适用于显示结果的组件
 * @param isResultComponent 是否结果组件，true:结果组件;false:一般组件
 */
var showComponentModal = function (stepId, parentId, taskId, flowId, taskStepId, flowRight, componentTitles, componentUrls, logAct, imgUrl, simple, onlyShowLog) {
    var numberTaskId = parseInt(taskId);
    var isShowLog = isEmpty(logAct) ? false : true; // 有些组件不需要显示运行日志和任务日志
    var commonPrefix = ctx + 'pages/common/';
    var params = 'stepId=' + stepId + '&parentId=' + parentId + '&flowId=' + flowId + '&taskId=' + taskId + '&taskStepId=' + taskStepId + '&flowRight=' + flowRight;

    var componentTitle;
    if (isArray(componentTitles)) {
        componentTitle = componentTitles[0];
    } else {
        componentTitle = componentTitles;
    }
    if (onlyShowLog) {
        params += '&title=' + componentTitle;
        params += '&url=' + componentUrls;
        params += '&canDblClick=true';
    }

    var commonMonitorUrl = commonPrefix + 'common_monitor.jsp?' + params; // 通用组件监控tab
    var commonConfigUrl = commonPrefix + 'common_config.jsp?' + params; // 通用配置tab
    var jobDependUrl = commonPrefix + 'job_depend.jsp?' + params; // 调度依赖
    var paramSettingTab = commonPrefix + 'param_setting.jsp?' + params; // 参数设置
    var commonLogUrl = commonPrefix + 'common_log.jsp?' + params + '&act=' + logAct; // 通用日志tab
    var commonTaskLogUrl = commonPrefix + 'complete_log.jsp?' + params; // 通用任务日志tab
    var commonErrorUrl = commonPrefix + 'common_error.jsp?' + params; // 通用组件错误tab
    var bodyContent = '<div>' +
        '<ul class="nav nav-tabs" role="tablist" id="component-tab">';

    var active = '';
    if (numberTaskId <= 0) {
        active = 'active';
    }
    if (typeof simple == 'undefined') {
        simple = false;
    }
    if (!simple) {
        if (numberTaskId > 0) {
            // 默认选中第一个tab页，即class="active"
            bodyContent +=
                '<li role="presentation" class="active"><a href="#commonMonitorUrl" aria-controls="commonMonitorUrl" role="tab" data-toggle="tab">组件监控</a></li>';
        }

        bodyContent +=
            '<li role="presentation" class="' + active + '"><a href="#commonConfigUrl" aria-controls="commonConfigUrl" role="tab" data-toggle="tab">通用配置</a></li>';

        bodyContent +=
            '<li role="presentation"><a href="#jobDependUrl" id="jobDependUrlTab" aria-controls="jobDependUrl" onclick="showTab(this)" role="tab" data-toggle="tab">调度依赖</a></li>';
        
        bodyContent +=
            '<li role="presentation"><a href="#paramSettingUrl" id="paramSettingTab" aria-controls="paramSettingUrl" onclick="showTab(this)" role="tab" data-toggle="tab">参数设置</a></li>';
        
    }

    var componentTabContents = '';
    if (!onlyShowLog) {
        if (isArray(componentTitles)) {
            var len = componentTitles.length;
            for (var i = 0; i < len; i++) {
                componentTabContents += '<li role="presentation"><a href="#component' + i + '" onclick="showTab(this)"  aria-controls="component' + i + '" role="tab" data-toggle="tab">' + componentTitles[i] + '</a></li>';
            }
        } else {
            componentTabContents = '<li role="presentation"><a href="#component" onclick="showTab(this)" aria-controls="component" role="tab" data-toggle="tab">' + componentTitles + '</a></li>';
        }
    }
    bodyContent += componentTabContents;

    if (!simple) {
        if (numberTaskId > 0) {
            if (isShowLog) {
                bodyContent +=
                    '<li role="presentation"><a id="commonTaskLog" href="#commonTaskLogUrl" onclick="showTab(this)" aria-controls="commonTaskLogUrl" role="tab" data-toggle="tab">任务日志</a></li>' +
                    '<li role="presentation"><a href="#commonLogUrl" onclick="showTab(this)" aria-controls="commonLogUrl" role="tab" data-toggle="tab">运行日志</a></li>';
            }
            bodyContent +=
                '<li role="presentation"><a href="#commonErrorUrl" onclick="showTab(this)" aria-controls="commonErrorUrl" role="tab" data-toggle="tab">错误信息</a></li>';
        }
    }

    if (onlyShowLog) {
        bodyContent +=
            '<li role="presentation"><a id="commonTaskLog" href="#commonTaskLogUrl" onclick="showTab(this)" aria-controls="commonTaskLogUrl" role="tab" data-toggle="tab">任务日志</a></li>' +
            '<li role="presentation"><a href="#commonLogUrl" onclick="showTab(this)" aria-controls="commonLogUrl" role="tab" data-toggle="tab">运行日志</a></li>';
    }

    bodyContent +=
        '</ul>' +
        '<div class="tab-content">';

    if (!simple) {
        if (numberTaskId > 0) {
            bodyContent += '<div role="tabpanel" class="tab-pane active" id="commonMonitorUrl">' +
            '<iframe scrolling="yes" frameborder="0"' +
            'src="' + commonMonitorUrl + '"' +
            'style="width: 100%; height: 400px;overflow: hidden;">' +
            '</iframe>' +
            '</div>';
        }
        bodyContent +=
            '<div role="tabpanel" class="tab-pane' + ' ' + active + '" id="commonConfigUrl">' +
            '<iframe scrolling="yes" frameborder="0"' +
            'src="' + commonConfigUrl + '"' +
            'style="width: 100%; height: 400px;overflow: hidden;">' +
            '</iframe>' +
            '</div>';
        bodyContent +=
            '<div role="tabpanel" class="tab-pane" id="jobDependUrl">' +
            '<iframe scrolling="yes" frameborder="0"' +
            'original="' + jobDependUrl + '"' +
            'style="width: 100%; height: 400px;overflow: hidden;">' +
            '</iframe>' +
            '</div>';
        bodyContent +=
            '<div role="tabpanel" class="tab-pane" id="paramSettingUrl">' +
            '<iframe scrolling="yes" frameborder="0"' +
            'original="' + paramSettingTab + '"' +
            'style="width: 100%; height: 400px;overflow: hidden;">' +
            '</iframe>' +
            '</div>';
    }

    var componentTabtPanelContents = '';
    if (!onlyShowLog) {
        if (isArray(componentUrls)) {
            var len = componentUrls.length;
            for (var i = 0; i < len; i++) {
                componentTabtPanelContents += '<div role="tabpanel" class="tab-pane" id="component' + i + '">' +
                '<iframe scrolling="yes" frameborder="0"' +
                'original="' + componentUrls[i] + ('?' + params) + '"' +
                'style="width: 100%; height: 400px; overflow: hidden;">' +
                '</iframe>' +
                '</div>';
            }
        } else {
            componentTabtPanelContents = '<div role="tabpanel" class="tab-pane" id="component">' +
            '<iframe scrolling="yes" frameborder="0"' +
            'original="' + componentUrls + ('?' + params) + '"' +
            'style="width: 100%; height: 400px; overflow: hidden;">' +
            '</iframe>' +
            '</div>';
        }
    }
    bodyContent += componentTabtPanelContents;


    if (!simple) {
        if (numberTaskId > 0) {
            if (isShowLog) {
                bodyContent += '<div role="tabpanel" class="tab-pane" id="commonTaskLogUrl">' +
                '<iframe scrolling="yes" frameborder="0"' +
                'original="' + commonTaskLogUrl + '"' +
                'style="width: 100%; height: 400px;overflow: hidden;">' +
                '</iframe>' +
                '</div>' +
                '<div role="tabpanel" class="tab-pane" id="commonLogUrl">' +
                '<iframe scrolling="yes" frameborder="0"' +
                'original="' + commonLogUrl + '"' +
                'style="width: 100%; height: 400px;overflow: hidden;">' +
                '</iframe>' +
                '</div>';
            }

            bodyContent +=
                '<div role="tabpanel" class="tab-pane" id="commonErrorUrl">' +
                '<iframe scrolling="yes" frameborder="0"' +
                'original="' + commonErrorUrl + '"' +
                'style="width: 100%; height: 400px;margin-bottom: 10px;overflow: hidden;">' +
                '</iframe>' +
                '</div>';
        }
    }

    if (onlyShowLog) {
        bodyContent += '<div role="tabpanel" class="tab-pane" id="commonTaskLogUrl">' +
        '<iframe scrolling="yes" frameborder="0"' +
        'original="' + commonTaskLogUrl + '"' +
        'style="width: 100%; height: 400px;overflow: hidden;">' +
        '</iframe>' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane" id="commonLogUrl">' +
        '<iframe scrolling="yes" frameborder="0"' +
        'original="' + commonLogUrl + '"' +
        'style="width: 100%; height: 400px;overflow: hidden;">' +
        '</iframe>' +
        '</div>';
    }

    bodyContent +=
        '</div>' +
        '</div>';

    var isTask = false;

    if (numberTaskId >= 0) {
        isTask = true;
    }

    if (parseInt(flowRight) < 2) {
        isTask = true;
    }

    var component = getComponentStr(null, componentTitle, bodyContent, isTask, imgUrl);
    parent.$(component).modal({backdrop: 'static', keyboard: false}); // 显示组件模态框
    parent.$("#component-tab a[data-toggle=tab]").on("click", function (e) {
        if ($(this).parent().hasClass("disabled")) {
            e.preventDefault();
            return false;
        }
    });

    //选中
    if (simple) {
        parent.$('#component-tab a:first').click();
    }
}

/** 根据任务id和环节id获取任务环节id，用于显示结果组件 */
function getTaskStateByTaskIdAndStepId(callback, isDependParent, stepId, parentId, taskId, flowId, taskStepId, flowRight, componentTitle, componentUrl, logAct, imgUrl, simple, onlyShowLog, isResultComponent) {
    if(isEmpty(isResultComponent)) isResultComponent = false;
    if (isResultComponent) {
        if (isEmpty(taskId) || parseInt(taskId) <= 0) {
            showAlert('提示', '无法查看流程结果，请打开流程对应的任务，然后查看结果');return;
        }
    }
    var pStepId = stepId;
    if (isDependParent && !isEmpty(parentId)) {
        pStepId = parentId.split(';')[0];
    }
    if (!isEmpty(taskId) && !isEmpty(pStepId)) {
        $.ajax({
            type: 'post',
            async: false,
            cache: false,
            url: ctx + 'task/stat/' + taskId + '/' + pStepId,
            success: function (res) {
                if (res && res.result) {
                    callback && callback(pStepId, parentId, taskId, flowId, res.message.taskStepId, flowRight, componentTitle, componentUrl, logAct, imgUrl, simple, onlyShowLog);
                } else {
                    showAlert('错误提示', res.message)
                }
            },
            error: function () {
                showAlert('错误提示', '网络错误');
            }
        });
    }
}

var showDMOutputResult = function (flowId, taskId, stepId, parentId, taskStepId, cycle, title, url) {
    var modalTitle = '结果';
    if (!isEmpty(title)) {
        modalTitle = title;
    }
    var params = 'stepId=' + stepId + '&parentId=' + parentId + '&flowId=' + flowId + '&taskId=' + taskId + '&taskStepId=' + taskStepId + '&cycle=' + cycle;
    StageDialog({
        modalId: 'component-result',
        method: 'iframe',
        url: url + '?' + params,
        title: modalTitle,
        height: '450px',
        showFooter: false
    });
}