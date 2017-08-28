//Create new workout form
function new_wo_form(form_location){
    var form_meta = '#id_workout_set';
    var index = $(form_meta + '-TOTAL_FORMS').val();
    var new_index = form_location.children().length + 1;
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
    form_location.append(wo_temp);
    $(form_meta + '-TOTAL_FORMS').val(parseInt(index) + 1);
   
}

//Create new workout form
function wo_form(form_location, form_name){
    var form_meta = '#id_workout_set';
    var index = $(form_meta + '-TOTAL_FORMS').val();
    var new_index = form_location.children().length + 1;
    var wo_temp = `<!--new_wo_form--!>
        <li class="to_sort"><div><table>
            <input type="hidden" name="workout_set-${index}-id" id="id" />
            <input type="hidden" name="workout_set-${index}-routine" value="${routine_id}" id="routine" />
            <th><input type="number" value="${new_index}" name="workout_set-${index}-day" min="0" id="day" /></th>
            <th colspan = "4"><input type="text" name="workout_set-${index}-name" maxlength="100" id="name" value="${form_name}"/></th>
            <th class="js-remove">X</th>
            <th style="display:none"> <input type="checkbox" name="workout_set-${index}-DELETE" id="DELETE" class="wo_DELETE"/></th>
        </li></table></div>
        `
    form_location.append(wo_temp);
    $(form_meta + '-TOTAL_FORMS').val(parseInt(index) + 1);
   
}

//Create 'Rest day' element
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

//Create a new excercise
function add_ex(list){
    var wo_id = list.attr('data-wo_id');
    var form_meta = "#id_excercises-" + wo_id +"-TOTAL_FORMS";
    alert(form_meta);
    var index = $(form_meta).val();
    alert(index);
    //create the new excercise list item
    var new_ex = $('#to_clone').find('.blank_ex').clone();
    new_ex.html(new_ex.html().replace(/0/g, index));
    new_ex.html(new_ex.html().replace(/\[WO\]/g, wo_id));
    list.append(new_ex);
    //change the form meta data
    $(form_meta).val(parseInt(index)+1);
}
