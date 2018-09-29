class GeneralUtils{
    /**
     * 根据id和parentId处理
     * @param {*} arr 
     */
    static arrToTree(arr){
        if(arr&&arr.length>0){
            //找到所有的根菜单,以及非根菜单
            let rootArr=[];
            let notRootArr=arr.filter(child=>{
                //判断当前child是不是一个根菜单 
                let isChildRoot=arr.every(subChild=>{
                    if(child.parentId!==subChild.id||child.id===subChild.id){
                        return true;
                    }else{
                        return false;
                    }
                });
                if(isChildRoot){
                    rootArr.push(child);
                    return false;
                }else{
                    return true;
                }
            });
            if(rootArr&&rootArr.length>0){
                rootArr.forEach(rootMenu=>{
                    this.findChildren(rootMenu,notRootArr);
                });
                return rootArr;
            }

        }
    }
    /**
     * 给parent从arr中找到所有的子元素，用了递归
     * @param {*} parent 
     * @param {*} arr 
     */
    static findChildren(parent,arr){
        if(arr&&parent&&arr.length>0){
            let newArr=arr.filter(child=>{//返回没被归为parent的子元素的元素
                if(child&&child.parentId&&child.parentId===parent.id){
                    if(!parent.children){
                        parent.children=[];
                    }
                    parent.children.push(child);
                    return false;
                }else{
                    return true;
                }
            });
            //继续给parent的每个child找到它们的子元素,以及它们子元素的子元素，递归
            if(parent.children){
                parent.children.forEach(child => {
                    this.findChildren(child,newArr);
                });
            }
        }
    }
}
module.exports=GeneralUtils;