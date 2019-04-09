 // прайс лист
var priceList2 = {
    //                             Solartek                     Llumar                   ЗЕРКАЛЬНЫЕ
   //                        3         2     1              3     2     1               3     2     1
    class1:{ solartek: [[2500,3000], 1500, 2000], llumar:[4000, 2000, 2500], mirror: [4000, 2000, 2500]},
    class2:{ solartek: [[3000,3500], 1500, 2000], llumar:[4500, 2000, 2500], mirror: [4500, 2000, 2500]},
    class3:{ solartek: [[3500,4000], 1500, 2500], llumar:[5000, 2000, 3500], mirror: [5000, 2000, 3500]},
    class4:{ solartek: [5000, 1500, 2500], llumar:[6000, 2000, 3500], mirror: [5000, 2000, 3500]},
    class5:{ solartek: [[3500,4000], 1500, 2500], llumar:[5000, 2000, 3500], mirror: [5000, 2000, 3500]},
    class6:{ solartek: [4500, 1500, 2500], llumar:[6500, 2000, 3500], mirror: [6500, 2000, 3500]}
}

var vm = new Vue({
    el: "#app",
    data: {
        isMenu: false,

        contFoto: 14,//количество ффото
        contFotoPage:6,  //количество фото на странице
        arrIsTypes: [0,0,0,0,0,0,0,0,0,0,0,0],
        allPhotos: [],
        currentBigFoto: "",
        currentIdFoto: 0,
        currentItemPager: 1,
        isShowPhoto: false,
        //свойства для калькулятора
        priceList: priceList2, 
        classAvto: "1",
        calcImg: [0,0,0], //321
    },
    computed:{  //вычисляемые свойства
        contItemPager: function(){   //количество элементов в пагинаторе
            return Math.ceil(this.contFoto / this.contFotoPage);
        },
        currentArrFoto: function(){   //текущий массив фоток
            var arrFoto = [];
            var startFoto = (this.currentItemPager - 1) * this.contFotoPage ;
            var finishtIdFoto = this.currentItemPager * this.contFotoPage ;

            return this.allPhotos.slice(startFoto, finishtIdFoto); // копировать нужный кусок массива
        },
        solartekPrice: function(){
            var sum = 0;

            if(this.classAvto == "4" || this.classAvto == "6" ){
                var sum = 0;

                if(this.calcImg[0]) sum += this.priceList["class" + this.classAvto].solartek[0];
                if(this.calcImg[1]) sum += this.priceList["class" + this.classAvto].solartek[1];
                if(this.calcImg[2]) sum += this.priceList["class" + this.classAvto].solartek[2];
                return sum;
            }else{
                if(this.calcImg[0]){ 
                    sum =[0,0];
                    sum[0] += this.priceList["class" + this.classAvto].solartek[0][0];
                    sum[1] += this.priceList["class" + this.classAvto].solartek[0][1];
                    if(this.calcImg[1]){  
                        sum[0] += this.priceList["class" + this.classAvto].solartek[1];
                        sum[1] += this.priceList["class" + this.classAvto].solartek[1];
                    };
                    if(this.calcImg[2]){  
                        sum[0] += this.priceList["class" + this.classAvto].solartek[2];
                        sum[1] += this.priceList["class" + this.classAvto].solartek[2];
                    };
                    sum = sum[0] + " - " + sum[1];
                }else{
                    if(this.calcImg[1]){  
                        sum += this.priceList["class" + this.classAvto].solartek[1];
                    };
                    if(this.calcImg[2]){  
                        sum += this.priceList["class" + this.classAvto].solartek[2];
                    
                    };
                };
            };
            return sum;    
        },
        llumarkPrice: function(){
            var sum = 0;

            if(this.calcImg[0]) sum += this.priceList["class" + this.classAvto].llumar[0];
            if(this.calcImg[1]) sum += this.priceList["class" + this.classAvto].llumar[1];
            if(this.calcImg[2]) sum += this.priceList["class" + this.classAvto].llumar[2];
            return sum;
        },
        mirrorkPrice: function(){
            var sum = 0;

            if(this.calcImg[0]) sum += this.priceList["class" + this.classAvto].mirror[0];
            if(this.calcImg[1]) sum += this.priceList["class" + this.classAvto].mirror[1];
            if(this.calcImg[2]) sum += this.priceList["class" + this.classAvto].mirror[2];
            return sum;
        }
    },
    watch: {  //наблюдаемые свойства
        contFotoPage: function () {
            this.currentItemPager = 1;  //при изменении количества фото на странице, текущей становиться первая
        },
        classAvto:  function () {
            this.calcImg = [0,0,0]  //сброс кнопок при смене класа автомобиля
        }
    },
    mounted: function() {    //перед тем как шаблон прикреплен к DOM
        for (var i = 1; i <= this.contFoto; i++) {    
            this.allPhotos.push({
                urlPhoto: 'img/origin/'+i+'.jpg',
                urlLittleFoto: 'img/little/'+i+'.jpg', //поменьше
                id: i
            });  
        };
        document.addEventListener("keydown", function(evt){  //закрыть через эскейп
            // var t = this;
            // console.log(this)
            if (vm.isShowPhoto && evt.keyCode == 27){ 
                vm.isShowPhoto = false;
            }
            console.log(this.isShowPhoto)
        });
    },
    methods:{
        openTypes: function(n){
            Vue.set(this.arrIsTypes, n, !this.arrIsTypes[n])
        },
        showPhoto: function(id) { 
            if(id == "no") return; // проверка на последнюю
            var t = this;
            
            t.currentIdFoto = id;
            t.allPhotos.forEach(function(photo) {
                if (photo.id === id) {     
                    // заблокировать фон и показать фото
                    t.isShowPhoto = true;    
                    t.currentBigFoto = photo.urlPhoto; 
                }
            })
        },
        closeFoto: function(){
            var t = this;
            if (t.isShowPhoto){ 
                t.isShowPhoto = false;
            }
        },
    }
});



