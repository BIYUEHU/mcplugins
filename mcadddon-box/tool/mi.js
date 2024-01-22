
function format (txt,compress) {
    var indentChar = ' ';
    if(/^\s*$/.test(txt)) { 
        alert('数据为空,无法格式化! ');
        return;
    } 
    try {var data=eval('('+txt+')');
    }
    catch (e) {
        alert('数据源语法错误,格式化失败! 错误信息: '+e.description,'err');
        return;
    };
    var draw=[],last=false,This=this,line=compress?'':'\n',nodeCount=0,maxDepth=0;
    var notify = function(name,value,isLast,indent/*缩进*/,formObj) { 
        nodeCount++;
        for (var i=0,tab='';i<indent;i++ )tab+=indentChar;
        tab=compress?'':tab;
        maxDepth=++indent;
        if(value&&value.constructor==Array) {
            draw.push(tab+(formObj?('"'+name+'":'):'')+'['+line);
            for (var i=0;i<value.length;i++) notify(i,value[i],i==value.length-1,indent,false);
            draw.push(tab+']'+(isLast?line:(','+line)));
        } else if (value&&typeof value=='object') {
            draw.push(tab+(formObj?('"'+name+'":'):'')+'{'+line);
            var len=0,i=0; for(var key in value)len++;
            for(var key in value)notify(key,value[key],++i==len,indent,true);
            draw.push(tab+'}'+(isLast?line:(','+line)));
        } else { 
            if (typeof value=='string')
            value='"'+value+'"'; draw.push(tab+(formObj?('"'+name+'":'):'')+value+(isLast?'':',')+line); 
        }; 
    };
    var isLast=true,indent=0;
    notify('',data,isLast,indent,false); 
    return draw.join(''); 
}
a = "{\"a\":\"1\"}"
b = {"aa": "1"}
b = format(JSON.stringify(b),true)
alert(JSON.stringify("b"))
let str0 = ""
let str = str0 + "";
let value = "";
let u = "\\u";
for (let i = 0;i < b.length;i++) {
    b1 = b.charCodeAt(i);
    b2 = b1.toString(16);
    value = value + u + b2;
    
}
alert(value);
