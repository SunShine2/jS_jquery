


//tabs
function select_tab(id,target)
{
	$('table.dili_tabs').hide();
	$('table#'+id).show();
	var li = $(target).parent();
	li.parent().children('li').removeClass('selected');
	li.addClass('selected');
}