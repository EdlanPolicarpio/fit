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
            curr = curr.next();
            val = parseInt(curr.find('.wo_day').attr('value'));
        }else{
            add_rest(i);
        }
    }
    sorted_wo =  list.children().sort(wo_sort); 
    sorted_wo.appendTo(list);
}
//Create Sortable List for workouts
var workoutList = Sortable.create(wo_list, {
    sort: 'true',
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
//Update Workouts
function wo_update(list){
   list.children().each(function(){                                       
       $(this).find('.wo_day').attr("value", $(this).index());     
   });                                                         
    
}
//Workout Sorting
function wo_sort(a,b){
    var a_int = parseInt($(a).find('.wo_day').attr('value')); 
    var b_int = parseInt($(b).find('.wo_day').attr('value')); 
    return (b_int < a_int) ? 1:-1;
}

/* /////////////////////
 * Button Click events
 *//////////////////////
//Add workout
var wo_location = $('#wo_list');
$('#add_form').click(function(){new_wo_form($('#wo_list'))});

//Add and name workout
$('#add_update').click(function(){
    var new_wo = prompt("New workout name:", '')
    if( new_wo != null){
       wo_form($('#wo_list'), new_wo); 
       alert($('#submit_form').submit())
    }
});
//Add rest day
$('#add_rest').click(function(){
    var new_index = $('#wo_list').children().length + 1;
    add_rest(new_index);
});
