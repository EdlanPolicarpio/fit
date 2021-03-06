//Document Ready
$(document).ready(function(){
    init_woList($('#wo_list'));
});
//Sort and add 'rest day' placeholders
function init_woList(list){
    var sorted_wo = list.children().sort(wo_sort); 
    sorted_wo.appendTo(list);
    var max_day = sorted_wo.last().find('.wo_day').attr('value');
    var curr = sorted_wo.first();
    var val = parseInt(curr.find('.wo_day').attr('value'));
    for(var i= 0; i< max_day; i++){
        if(val === i){
            var ex_list = curr.find('.ex_list');
            ex_list.append(ex_list.children().sort(ex_sort));
            curr = curr.next();
            val = parseInt(curr.find('.wo_day').attr('value'));
        }else{
            add_rest(i);
        }
    }
    sorted_wo =  list.children().sort(wo_sort); 
    sorted_wo.appendTo(list);
    wo_update($('#wo_list'));
}
//Create Sortable List for workouts
var workoutList = Sortable.create(wo_list, {
    sort: 'true',
    animation: '300',
    scroll: 'true',
    filter: '.js-remove',
    onFilter: function (evt) {
       var el = workoutList.closest(evt.item); // get dragged item
       var form = el.parentNode;
       try{
            $(el).find('.wo_DELETE')[0].checked = true;
       }catch(err){
            console.log("Rest day");
       }
       $("#deleted").append(el);
       var list = $('#wo_list');                                   
       wo_update($('#wo_list'));
    },
   onUpdate: function(evt){                                        
       wo_update($('#wo_list'));                                   
   }                                                               
});
//Make each ex_list sortable
var ex_lists = $('.ex_list');
ex_lists.each( function(i,e){
    var sortable = Sortable.create(e, {
        animation:150,
        sort: 'true',
        filter: '.ex-remove',
        onFilter: function(evt){
            var el  = sortable.closest(evt.item);
            var prnt= el.parentNode.parentNode;
            $(el).find('.ex_DELETE')[0].checked = true;
            $(prnt).find('.deleted_ex').append(el);
        },
        onUpdate: function(evt){
            ex_update($('.ex_list'));
        }
    })
})
/* /////////////////////
 * List Sorting
 *//////////////////////
//Workout Sorting
function wo_sort(a,b){
    var a_int = parseInt($(a).find('.wo_day').attr('value')); 
    var b_int = parseInt($(b).find('.wo_day').attr('value')); 
    return (b_int < a_int) ? 1:-1;
}
//Excercise Sorting
function ex_sort(a,b){
    var a_int = parseInt($(a).find('.ex_order').attr('value')); 
    var b_int = parseInt($(b).find('.ex_order').attr('value')); 
    return (b_int < a_int) ? 1:-1;
    
}
//Update Workouts
function wo_update(list){
   list.children().each(function(){                                       
       $(this).find('.wo_day').attr("value", $(this).index());
       $(this).find('.wo_day_disp').html($(this).index());
   });                                                         
    
}
//Update Ex 
function ex_update(list){
   list.children().each(function(){                                       
       $(this).find('.ex_order').attr("value", $(this).index());     
   });                                                         
    
}
/* /////////////////////
 * Button Click events
 *//////////////////////
//Add Excercise
$('.add_ex').click(function(){
    var loc = $(this).parent().parent().find('.ex_list');
    add_ex($(loc));
});
//Add workout
var wo_locat = $('#wo_list');
$('#add_form').click(function(){new_wo_form($('#wo_list'))});

//Add and name workout
$('#add_update').click(function(){
    var new_wo = prompt("New workout name:", '')
    if( new_wo != null){
       wo_form($('#wo_list'), new_wo); 
       $('#submit_form').click();
    }
});
//Add rest day
$('#add_rest').click(function(){
    var new_index = $('#wo_list').children().length + 1;
    add_rest(new_index);
});
