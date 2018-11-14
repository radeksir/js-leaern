// http://embed.plnkr.co/rbpDg4gf0QwgQZGvRMrG

function loadSettings() {
	$('.todo').html(localStorage.mydata);
	$('.inp-add').val(localStorage.weight);


}

function saveSettings() {
	localStorage.mydata = $('.todo').html();
	localStorage.weight = $('.inp-add').val();


}

$(document).ready(function(){
	loadSettings();

	$(window).on('unload', function(){
		saveSettings();
		loadSettings();
	});

	$('.todo').each(function() {
		var $this = $(this);
		var $inpAdd = $this.find(".inp-add");
		var $btnAdd = $this.find(".btn-add");
		var $list;

		var newValue;

		$inpAdd.keypress(function (e) {
			var key = e.which;
			if(key == 13 && $inpAdd.val().length)  // the enter key code
			{
				$btnAdd.click();
				return false;
			}
		});

		function functionSingleItem($item) {
			var $btnRemove = $item.find(".btn-remove");
			var $checkbox = $item.find(".inp-checkbox");

			$btnRemove.on( "click", function(e) {
				$item.remove();
				return false;
			});

			$checkbox.on('click', function(e) {
				if ($checkbox.is(':checked')){
					$item.addClass('done');
				}else{
					$item.removeClass('done');
				}
			});
		}

		function functionItem() {
			var $items = $this.find(".item");

			$items.each(function () {
				functionSingleItem($(this));
			});
		}

		$btnAdd.on( "click", function(e) {
			newValue = $inpAdd.val();
			$inpAdd.val('');

			var $newItem = $('<li class="item"><input type="checkbox" class="inp-checkbox"><span class="text"> ' + newValue + ' </span><a href="#" class="btn-remove">Smazat</a></li>');

			if ($this.find('.list').length){
				$this.find('.list').append($newItem);
			} else {
				var $list = $('<ul class="list"></ul>');
				$list.append($newItem);
				$this.prepend($list);
			}

			functionSingleItem($newItem);
		});




		functionItem();

	});
});

