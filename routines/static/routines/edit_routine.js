//For some reason, sortable index starts at 4
const ROOT_INDEX = 4
//Create Sortable for workouts
var editableList = Sortable.create(wo_list, {
    sort: 'true',
    scroll: 'true',
    filter: '.js-remove',
    onFilter: function (evt) {
            var el = editableList.closest(evt.item); // get dragged item
            var form = el.parentNode;
            var inputs = el.getElementsByTagName('input');
            for( var i = 0; i <inputs.length; i++){
                if( inputs[i].getAttribute('type') == 'checkbox'){
                    inputs[i].checked = true;
                }
            }
            $("#deleted").append(el);
            //form.removeChild(el);
    },
    onUpdate: function(evt){
        var inputs = evt.item.getElementsByTagName('input');
        for(var i = 0; i<inputs.length; i++){
            if( inputs[i].getAttribute('type') == 'number'){
                inputs[i].value = evt.newIndex;
            }
        }
        alert(evt.from);
    }
});
//Function for creating a new form
function add_form(appendTo, id, template){
    var table_meta = id + '-TOTAL_FORMS';
    var form_idx = $(table_meta).val();
    var index = form_idx;
    var wo_temp = `<!--new_wo_form--!>
        <div id="workout"><table>
            <input type="hidden" name="workout_set-${index}-id" id="id" />
            <input type="hidden" name="workout_set-${index}-routine" value="${routine_id}" id="routine" />
            <th><input type="number" name="workout_set-${index}-day" min="0" id="day" /></th>
            <th colspan = "4"><input type="text" name="workout_set-${index}-name" maxlength="100" id="name" /></th>
            <th class="js-remove">X</p>
            <th> <input type="checkbox" name="workout_set-${index}-DELETE" id="DELETE" /></th>
      </table></div>
    `
    appendTo.append(wo_temp);
    $(table_meta).val(parseInt(form_idx) + 1);
}
//Add form event
var wo_location = $('#wo_form_set');
var wo_id = '#id_workout_set';
var wo_template = `` 
$('#add_form').click(function(){add_form(wo_location,wo_id, wo_template)});
