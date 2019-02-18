$(function () {

    const baseURL = "http://192.168.0.100:8085/qnm/"
    // 返回
    $(".header-fanhui").click(function () {
        window.history.go(-1);
    });

    // 搜索按钮结果
    function searchResult() {
        let brandName = $('#brandName').val()
        let goodsName = $('#goodsName').val()
        let specificationsName = $('#parameter').val()
        const api = 'handlecustomSelect.do'
        if (brandName!=="" || goodsName!=="" || specificationsName!=="") {
            var url = baseURL + api + '?brandName=' + brandName + '&goodsName=' + goodsName + '&specificationsName=' + specificationsName
        }
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            success: function (Data) {
                if(JSON.stringify(Data) === '[]'){
                    $('.place-order').css('display', 'block')
                    $(".con").on('click', '#place-order', function (){
                    	brandName = $('#brandName').val()
                        goodsName = $('#goodsName').val()
                        specificationsName = $('#parameter').val()
                    	if(brandName!=="" && goodsName!=="" && specificationsName!==""){
                    		orderToolTipbox(brandName, goodsName, specificationsName)
                    	}else{
                    		toolTipbox("请填写完整的信息！")
                    	}
                    })
                }else{
                    $('.shop-content').css('display', 'block')
                    for(let i = 0; i < Data.length; i++){
                        let lihtml = 
                        '<li>' +
                            '<input type="text" value="'+ Data[i].id +'">' +
                            '<img class="shop_photo" src="../uploadImage/'+ Data[i].image +'" />' +
                            '<div class="shop_info">' +
                                '<h3>'+ Data[i].name +'</h3>' +
                                '<p>最低价：<span>'+ Data[i].price +'</span>元 <em>'+ Data[i].supermarket +'</em></p>' +
                                '<span class="shop_price">查看其它超市价格</span><span class="count">加入购物车</span>' +
                            '</div>' +
                        '</li>'
                        $('.shop-content ul').append(lihtml)
                    }
                }               
            }
        })
    }

    // 品牌输入搜索结果
    function searchBrandResult() {
        const brandName = $('#brandName').val()
        const brand = document.getElementById('brandName')
        let brandTop = brand.getBoundingClientRect().top
        const brandLeft = brand.getBoundingClientRect().left
        const brandHeight = brand.getBoundingClientRect().height
        const brandWidth = brand.getBoundingClientRect().width
        brandTop = brandTop + brandHeight
        $.ajax({
            url: 'brandNameList.do?brandName='+ brandName,
            type: 'get',
            dataType: 'json',
            success: function (Data) {
                if(JSON.stringify(Data) !== '[]'){
                    $('#brandlist').remove()
                    let branddiv = document.createElement('div')
                    branddiv.id = "brandlist";
                    $('.con').append(branddiv)
                    for(let i = 0; i < Data.length; i++){
                        let lihtml = '<div class="brand-name">' + Data[i] + '</div>'
                        $('#brandlist').append(lihtml)
                    }
                    $('#brandlist').css({'left':brandLeft, 'top':brandTop, 'width':brandWidth})
                }                          
            }
        })
    }

    //查询其他超市价格
    $(".con").on('click', '.shop_price', function (){
        let goodsId = $(this).parent().siblings().eq(0).val()
        let goodsName = $(this).siblings().eq(0).html()
        $.ajax({
            url: 'showOtherSupermarket1.do?id=' + goodsId,
            type: 'get',
            dataType: 'json',
            success: function (Data) {
            	console.log(Data)
                marketToolTipbox(goodsName, Data)            
            }
        })
    })
    
    $(".con").on('click', '.count', function (){
        let name = $(this).siblings().eq(0).html()
        let price = $(this).siblings().eq(1).find('span').html()
        let chaoshi = $(this).siblings().eq(1).find('em').html()
        let goodsId = $(this).parent().siblings().eq(0).val()
        cartToolTipbox(goodsId, name, price, chaoshi)
    })

    $(".con").on('click', '#brandlist', function (eee){
        let $brandlist = document.getElementById('brandlist')
        let top = Number($brandlist.getBoundingClientRect().top)
        let scrollTop = Number(eee.clientY)
        let height = Number($('.brand-name').height())
        let index = Math.ceil((scrollTop-top)/height)
        let brandText = $(this).find("div").eq(index-1).html()
        $('#brandName').val(brandText)
        $('#brandlist').remove()
    })

    $('#brandName').on('input oninput', function(){
        const brandName = $('#brandName').val()
        if(brandName===''){
            $('#brandlist').remove()
        }else{
            searchBrandResult()
        }        
    })

    /*$('#brandName').blur(function(){
        $('#brandlist').remove()
    })*/

    $('.search-btn').click(function() {
        $('.shop-content ul').html('')
        $('.tips ul').html('')
        $('.place-order').css('display', 'none')
        searchResult()
    })       
    
    // 直接下单弹窗
    function orderToolTipbox(brandName, goodsName, specificationsName) {
    	$('.layer').remove()
        let layer = document.createElement('div');
        layer.className = "layer";
        layer.innerHTML =
            '<div class="layerbg"></div>' +
            '<div class="layer_tips">' +
            '<h1>直接下单</h1><div class="tips"><ul></ul></div>' +
            '<div class="layer_button"><span class="layer_cancel">取消</span><span class="layer_ok">确定</span></div>' +
            '</div>';
        $(".con").after(layer);
            let li = '<li>品牌：' + brandName + '</li>' +
                     '<li>商品：' + goodsName + '</li>' +
                     '<li>规格参数：' + specificationsName + '</li>'
        $('.tips ul').append(li)
        $('.layerbg').show();
        $('.layer_tips').show();        
        $(".layer_cancel").click(function () {        	
            $('.layer').remove();           
        });
        $(".layer_ok").click(function () {        	
        		$.ajax({
                    url: '../custom/handleSendCustom.do',
                    type: 'post',
                    dataType: 'json',
                    data:{
                        "brandName":brandName,
                        "goodsName":goodsName,
                        "parameter":specificationsName
                        },
                    success: function (Data) {
                    	
                    }
                })
                $('.layer').remove()
                toolTipbox("你的搜索信息已提交给系统<br>稍后请到消息里查看处理！")
        });
    }

    // 信息提示框
    function toolTipbox(toolText) {
    	$('.layer').remove();
        let layer = document.createElement('div');
        layer.className = "layer";
        layer.innerHTML =
            '<div class="layerbg"></div>' +
            '<div class="layer_tips">' +
            '<h1>温馨提示</h1><div class="toolText">'+ toolText +'</div>' +
            '<div class="layer_button"><span class="layer_marketcancel">确定</span></div>' +
            '</div>';
        $(".con").after(layer);
        $('.layerbg').show();
        $('.layer_tips').show();        
        $(".layer_marketcancel").click(function () {
            $('.layer').remove();           
        });        
    }
    
    // 其它超市弹窗
    function marketToolTipbox(goodsId, Data) {
    	$('.layer').remove();
        let marketlist = Data.otherSupermarket
        let layer = document.createElement('div');
        layer.className = "layer";
        layer.innerHTML =
            '<div class="layerbg"></div>' +
            '<div class="layer_tips">' +
            '<h1>其它超市价格</h1><h3>'+ name +'</h3>' +
            '<div class="markettips"><ul></ul></div>' +
            '<div class="layer_button"><span class="layer_marketcancel">确定</span></div>' +
            '</div>';
        $(".con").after(layer)
        $('.markettips ul').remove
        for(let i=0; i<marketlist.length; i++) {
            let li = '<li>' + marketlist[i].supermarket + '：' + marketlist[i].price + '</li>'
            $('.markettips ul').append(li)
        }
        let chajialv = '<li class="chajialv">差价率：'+ Data.chajialv +'%</li>'
        $('.markettips ul').append(chajialv)          
        $('.layerbg').show();
        $('.layer_tips').show();
        $(".layer_marketcancel").click(function () {
            $('.layer').remove();           
        });
    }

    // 加入购物车弹窗
    function cartToolTipbox(goodsId, name, price, chaoshi) {
        let layer = document.createElement('div');
        layer.className = "layer";
        layer.innerHTML =
            '<div class="layerbg"></div>' +
            '<div class="layer_tips">' +
            '<h1>选择购买数量</h1>' +
            '<div class="buy_num"><button type="button" class="reduce"></button><em>1</em><button type="button" class="plus"></button></div>' +
            '<div class="num_bottom"></div>' +
            '<div class="layer_button"><span class="layer_cancel">取消</span><span class="layer_ok">确定</span></div>' +
            '</div>';                
        $(".con").after(layer)
        let num = Number($('.buy_num em').html())
        $(".reduce").click(function (){
            if(num>1){
                num = num - 1
            }
            $('.buy_num em').html(num)
        })
        $(".plus").click(function (){
            if(num<99){
                num = num + 1
            }
            $('.buy_num em').html(num)
        })          
        $('.layerbg').show();
        $('.layer_tips').show();
        $(".layer_cancel").click(function () {
            $('.layer').remove();           
        });
        $(".layer_ok").click(function () {
            $.ajax({
                url: 'addShopcar.do',
                type: 'post',
                dataType: 'json',
                data:{
                    "id":goodsId,
                    "name_":name,
                    "price":price,
                    "chaoshi":chaoshi,
                    "num":num
                    },
                success: function (Data) {
                	
                }
            })            
            $('.layer').remove();           
        });
    }
  

})