/**
 * 解析json到sql
 */
function sqlDecoder(br){
	
	this._br = br;
	
	this.data = [];
	
	this.append = function(text){
		this.data[this.data.length] = text;
	};
	
	this.parse = function(json){
		if(typeof json == 'string'){
			try{
				eval('json='+json);
			}
			catch(e){
				return [];
			}
		}
		
		this.table = 'T0';
		this.append('SELECT '+this._br);
		this.append('  (CASE'+this._br);
		this._parse(json,'        ',0);
		this.append('        ELSE NULL END'+this._br);
		
		this.append('  ) AS C0,'+this._br);
		
		this.append('  (CASE'+this._br);
		this._parse(json,'        ',1);
		
		this.append('        ELSE 0.0 END'+this._br);
		this.append('  ) AS C1'+this._br);
		
		this.append(' FROM {TABLE_NAME} '+this.table);
		
		return this.data;
	};
	
	this._parse = function(json,blank,n){
		for(var i=0;i<json.length;i++){
			if(blank)
			this.append(blank);
			this.append('WHEN (');
			
			if(json[i].ifs == 'in'){
				for(var j=0;j<json[i].value.length;j++){
					this.append('('+this.table+'.'+json[i].name+' = '+json[i].value[j]+')');
					if(j<json[i].value.length-1)
						this.append('OR');
				}
			}
			else
				this.append(this.table+'.'+json[i].name +' '+json[i].ifs+' '+json[i].value);
			
			this.append(')');
			
			this.append(' THEN ');
			
			if(json[i].child && json[i].child.length>0){
				this.append(this._br);
				this.append(blank+'(CASE'+this._br);
				this._parse(json[i].child,blank+'    ',n);
				
				if(n==0)
					this.append(blank+'    ELSE NULL END'+this._br);
				else
					this.append(blank+'    ELSE 0.0 END'+this._br);
				
				this.append(blank+')'+this._br);
			}
			else{
				if(n==0){
					var text = json[i].text;
					
					if(text && text != ''){
						text = text.replace(/\([\d\/\.]+\)$/,'');
						
						if(!/^[\d\.]+$/.test(text))
							text = "'"+text+"'";
						
						this.append(text);
					}
					
					this.append(this._br);
				}
				else{
					var arg = json[i].text ? json[i].text.match(/[\d\.]+/g) : [];
					if(arg.length>1){
						var tv = parseFloat(arg[0])/(parseFloat(arg[0])+parseFloat(arg[1]));
						this.append(tv+this._br);
					}
				}
			}
		};
	};
	
	return this;
};
