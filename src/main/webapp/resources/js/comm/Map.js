function struct(key, value) {    
   this.key = key;    
   this.value = value;    
 }    
     
 function put(key, value){    
   for (var i = 0; i < this.arr.length; i++) {    
     if ( this.arr[i].key === key ) {    
       this.arr[i].value = value;    
       return;    
     }    
   }    
   this.arr[this.arr.length] = new struct(key, value);    
 }    
     
 function get(key) {    
   for (var i = 0; i < this.arr.length; i++) {    
     if ( this.arr[i].key === key || parseInt(this.arr[i].key)===key) {    
       return this.arr[i].value;    
     }    
   }    
   return null;    
 }
 
 function getKeys(){
	 var keys = new Array();
	 for (var i = 0; i < this.arr.length; i++) { 
		 keys[i]= this.arr[i].key;
	 }
	 return keys;
 }
 
 function getValues(){
	 var values = new Array();
	 for(var i = 0; i < this.arr.length; i++) { 
		 values[i] = this.arr[i].value;
	 }
	 return values;
 }
     
 function remove(key) {    
   var v;    
   for (var i = 0; i < this.arr.length; i++) {    
     v = this.arr.pop();    
     if ( v.key === key ) {    
       continue;    
     }    
     this.arr.unshift(v);    
   }    
 }    
     
 function size() {    
   return this.arr.length;    
 }    
     
 function mapIsEmpty() {    
   return this.arr == null ? true : this.arr.length <= 0;    
 }    
     
 function Map() {    
   this.arr = new Array();    
   this.get = get;    
   this.put = put;    
   this.remove = remove;    
   this.size = size;    
   this.mapIsEmpty = mapIsEmpty;    
   this.sort = sort;
   this.getKeys = getKeys;
   this.getValues = getValues;
 }    
     
 function sort() {    
      
 }    
