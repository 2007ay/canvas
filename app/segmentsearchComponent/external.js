var initialize = function(typeScriptCallBack)
{   

        function triggerCallback(e, callback) {
          if (!callback || typeof callback !== 'function') {
            return;
          }
          var files;
          if (e.dataTransfer) {
            files = e.dataTransfer.files;
          } else if (e.target) {
            files = e.target.files;
          }
          callback.call(null, files);
        }

        var inti = function makeDroppable(ele, callback) {
          var input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('multiple', true);
          input.style.display = 'none';
          input.addEventListener('change', function (e) {
            triggerCallback(e, callback);
          });
          ele.appendChild(input);

          ele.addEventListener('dragover', function (e) {
            e.preventDefault();
            e.stopPropagation();
            ele.classList.add('dragover');
          });

          ele.addEventListener('dragleave', function (e) {
            e.preventDefault();
            e.stopPropagation();
            ele.classList.remove('dragover');
          });

          ele.addEventListener('drop', function (e) {
            e.preventDefault();
            e.stopPropagation();
            ele.classList.remove('dragover');
            triggerCallback(e, callback);
          });

          ele.addEventListener('click', function () {
            input.value = null;
            input.click();
          });
        }
        
        
        inti(window.document.querySelector('.demo-droppable'), typeScriptCallBack);
        // setPic();
}

$(function(){ 
		//alert();
		// $(parent_element_selector_here or document ).on('change','#imageFile' , function(){ uploadFile(); });
	
		   
});

function setPic(){
		 $('.hideImage').removeClass('setWidth')	;
		  $('.hideImage').removeClass('setheight')	;
	  var picwidth = $('.hideImage').width();
	  var picheight = $('.hideImage').height();
	  
	  //console.log(picwidth);
	  //console.log(picheight);
	  if(picheight <= picwidth){
		 $('.hideImage').addClass('setheight');
	  }else{
		   $('.hideImage').addClass('setWidth');
		  }
 }