var page = {
    currentpage: 0,
    activePageNum: 0,
    pageTotal: 16
};

$(function() {
    page.currentpage = 2;
    init(page.currentpage - 1);


});

function init(num) {

    $.ajax({
        url: "../page分页/pageContent.json",
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log(page.currentpage);
            if ((num + 1) == 1) {
                $('.prev-page').attr('disabled', 'disabled');
            } else {
                $('.prev-page').removeAttr('disabled');
            }
            if (num == page.pageTotal - 1) {
                $('.next-page').attr('disabled', 'disabled');
            } else {
                $('.next-page').removeAttr('disabled');
            }
            //            console.log($('.prev-page').attr('disabled'));
            var page1 = data.page[num].page;
            console.log(page1);
            $('.content-text').html(page1);

        }
    });
}
function prePage(){
  var curPage = document.getElementsByClassName('current')[0];
                var curNum = parseInt(curPage.firstChild.nodeValue);
                page.currentpage = curNum - 1 - 1;
                init(page.currentpage);
                console.log('curNum:' + curNum);
                if (curNum <= 6) {

                    //
                    curPage.removeAttribute('class');
                    curPage.setAttribute('href', 'javascript:;');
                    var preSib = curPage.previousSibling.previousSibling;
                     preSib.removeAttribute('href');
                    preSib.className = 'current';
                } else if (curNum > (page.pageTotal - 4)) {
                    curPage.removeAttribute('class');
                    curPage.setAttribute('href', 'javascript:;');
                    var preSib = curPage.previousSibling;
                    preSib.removeAttribute('href');
                    preSib.className = 'current';
                   
                } else if (curNum == (page.pageTotal - 9)) {
                    var html = '';
                    html = '<a class="turn-prev" href="javascript:;"></a>' +
                        '<a href="javascript:;" >' + (curNum - 6) + '</a>' +
                        '<a href="javascript:;" >' + (curNum - 5) + '</a>' +
                        '<a href="javascript:;" >' + (curNum - 4) + '</a>' +
                        '<a href="javascript:;" >' + (curNum - 3) + '</a>' +
                        '<a href="javascript:;" >' + (curNum - 2) + '</a>' +
                        '<a class="current">' + (curNum - 1) + '</a>' +
                        '<span class="ellipsis">...</span>' +
                        '<a href="javascript:;" data-num="16">16</a>' +
                        '<a class="turn-next" href="javascript:;"></a>';
                    var pageLi = document.getElementsByClassName('page-li')[0];
                    console.log(html);
                    pageLi.innerHTML = html;
                } else if (curNum > 7 && curNum <= (page.pageTotal - 4)) {
                    var html = '';
                    html = '<a class="turn-prev" href="javascript:;"></a>' +
                        '<a href="javascript:;" data-num="1">1</a>' +
                        '<span class="ellipsis">...</span>' +
                        '<a class="current" >' + (curNum - 1) + '</a>' +
                        '<a href="javascript:;" >' + curNum + '</a>' +
                        '<a href="javascript:;" >' + (curNum + 1) + '</a>' +
                        '<a href="javascript:;">' + (curNum + 2) + '</a>' +
                        '<span class="ellipsis">...</span>' +
                        '<a href="javascript:;" data-num="16">16</a>' +
                        '<a class="turn-next" href="javascript:;"></a>';
                    var pageLi = document.getElementsByClassName('page-li')[0];
                    console.log(html);
                    pageLi.innerHTML = html;
                }
}

function nextPage(){
//    alert('turn');
 var curPage = document.getElementsByClassName('current')[0];
                var curNum = parseInt(curPage.firstChild.nodeValue);
                console.log('curNum:' + curNum);
                page.currentpage = curNum;
                init(page.currentpage);
                //
                if (curNum < 6) {
                    curPage.removeAttribute('class');
                    curPage.setAttribute('href', 'javascript:;');
                    var nextSib = curPage.nextSibling.nextSibling;
                    nextSib.className = 'current';
                    nextSib.removeAttribute('href');
                } else if (curNum > (page.pageTotal - 5)) {
                    curPage.removeAttribute('class');
                    curPage.setAttribute('href', 'javascript:;');
                    var nextSib = curPage.nextSibling;
                    nextSib.className = 'current';
                    nextSib.removeAttribute('href');
                } else if (curNum == (page.pageTotal - 5)) {

                    var html = '';
                    html = '<a class="turn-prev" href="javascript:;"></a>' +
                        '<a href="javascript:;" data-num="1">1</a>' +
                        '<span class="ellipsis">...</span>' +
                        '<a class="current">' + (curNum + 1) + '</a>' +
                        '<a href="javascript:;" >' + (curNum + 2) + '</a>' +
                        '<a href="javascript:;" >' + (curNum + 3) + '</a>' +
                        '<a href="javascript:;">' + (curNum + 4) + '</a>' +
                        '<a href="javascript:;" data-num="16">' + (curNum + 5) + '</a>' +
                        '<a class="turn-next" href="javascript:;"></a>';
                    var pageLi = document.getElementsByClassName('page-li')[0];
                    console.log(html);
                    pageLi.innerHTML = html;
                } else if (curNum >= 6 && curNum < (page.pageTotal - 5)) {
                    console.log("turn next");
                    var html = '';
                    html = '<a class="turn-prev" href="javascript:;"></a>' +
                        '<a href="javascript:;" data-num="1">1</a>' +
                        '<span class="ellipsis">...</span>' +
                        '<a href="javascript:;">' + (curNum - 2) + '</a>' +
                        '<a href="javascript:;" >' + (curNum - 1) + '</a>' +
                        '<a href="javascript:;" >' + curNum + '</a>' +
                        '<a class="current" >' + (curNum + 1) + '</a>' +
                        '<span class="ellipsis">...</span>' +
                        '<a href="javascript:;" data-num="16">16</a>' +
                        '<a class="turn-next" href="javascript:;"></a>';
                    var pageLi = document.getElementsByClassName('page-li')[0];
                    console.log(html);
                    pageLi.innerHTML = html;
                }
}
$(function() {
    $('#upNav').delegate('span', 'click', function(event) {

        var elem = $(this);
       
        if (elem.attr('disabled')) {
            return;
        } else {
            var targetSpan = elem[0].className;
            if (targetSpan == 'prev-page') {
                prePage();

            } else {
                nextPage();
            }
        }

    });
});

$(function() {
    $('.page-li').delegate('a', 'click', function(event) {
        var elem = $(this)[0];
        if(elem.className=='turn-prev' || elem.className=='turn-next')
               return;
        var newPageNum = parseInt(elem.firstChild.nodeValue);
        console.log('newPageNum : '+newPageNum);
        init(newPageNum-1);
       
        var curPage = document.getElementsByClassName('current')[0];
        curPage.removeAttribute('class');
        curPage.setAttribute('href', 'javascript:;');
         elem.className='current';
        elem.removeAttribute('href');

    });
});
$(function(){

$('.page-li').delegate('.turn-prev', 'click',function(e){
 var elem = $(this);
      
        if (elem.attr('disabled')) {
            return;
        }else{
            prePage();
        }
});
    
$('.page-li').delegate('.turn-next', 'click',function(e){
 var elem = $(this);
      
        if (elem.attr('disabled')) {
            return;
        }else{
            nextPage(); 
        }
});
});

