//Document Ready
$(document).ready(function(){
    var sorted_wo =  $('#wo_list').children().sort(wo_sort); 
    sorted_wo.appendTo('#wo_list');
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
    var sorted_wo =  $('#wo_list').children().sort(wo_sort); 
    sorted_wo.appendTo('#wo_list');
});
//Create Sortable for workouts
var editableList = Sortable.create(wo_list, {
    sort: 'true',
    scroll: 'true',
    filter: '.js-remove',
    onFilter: function (evt) {
        var el = editableList.closest(evt.item); // get dragged item
        var form = el.parentNode;
        try{
            $(el).find('.wo_DELETE')[0].checked = true;
        }catch(err){
            console.log("Rest day");
        }
        $("#deleted").append(el);
       var list = $('#wo_list');                                   
       list.children().each(function(){                                       
           $(this).find('.wo_day').attr("value", $(this).index()); 
       
       });                                                         
   },
   onUpdate: function(evt){                                        
       var list = $('#wo_list');                                   
       list.children().each(function(){                                       
           $(this).find('.wo_day').attr("value", $(this).index()); 
       
       });                                                         
   }                                                               
});

//Workout Sorting
function wo_sort(a,b){
    return ($(b).find('.wo_day').attr('value') < $(a).find('.wo_day').attr('value')) ? 1:-1;
}

//Function for creating a new form
function add_form(appendTo, id, template){
    var table_meta = id + '-TOTAL_FORMS';
    var form_idx = $(table_meta).val();
    var index = form_idx;
    var new_index = appendTo.children().length + 1;
    var wo_temp = `<!--new_wo_form--!>
        <li class="to_sort"><div><table>
            <input type="hidden" name="workout_set-${index}-id" id="id" />
            <input type="hidden" name="workout_set-${index}-routine" value="${routine_id}" id="routine" />
            <th><input type="number" value="${new_index}" name="workout_set-${index}-day" min="0" id="day" /></th>
            <th colspan = "4"><input type="text" name="workout_set-${index}-name" maxlength="100" id="name" /></th>
            <th class="js-remove">X</th>
            <th style="display:none"> <input type="checkbox" name="workout_set-${index}-DELETE" id="DELETE" class="wo_DELETE"/></th>
      </li></table></div>
    `
    appendTo.append(wo_temp);
    $(table_meta).val(parseInt(form_idx) + 1);
}

//Add Rest Day
function add_rest(day){
    var workouts = $('#wo_list');
    var html = `<!--rest_day--!>
        <li class="to_sort rest"><div><table>
          <th><input type="number" value="${day}" class="wo_day"></th>
          <th colspan = "4">Rest Day</th>
          <th class="js-remove">X</th>
        </table></div></li>
        
        `
    workouts.append(html);
    
}
//Add form event
var wo_location = $('#wo_list');
var wo_id = '#id_workout_set';
var wo_template = `` 
$('#add_form').click(function(){add_form(wo_location,wo_id, wo_template)});

//Add rest day
$('#add_rest').click(function(){
    var new_index = $('#wo_list').children().length + 1;
    add_rest(new_index);
});
