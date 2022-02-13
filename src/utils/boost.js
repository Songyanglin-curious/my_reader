// 这是扩展的不添加重复元素的数组方法
Array.prototype.pushWithoutDuplicate = function(){
    for (let i =0 ;i <arguments.length ; i++){
        const arg = arguments[i]
        // 该this代指调用的数组
        if(this.indexOf(arg) === -1){
            this.push(arg)
        }
    }
}