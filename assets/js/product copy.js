
function displayData(){
    $.ajax({
        url: 'product_json.php?data=get_product',
        type: 'GET',
        dataType: 'json',
        success: function (alldata){
            var columns = [
                {title: 'Id'},
                {title: 'Product Name'},
                {title: 'Category'},
                {title: 'Quantity'},
                {title: 'Cost'},
                {title: 'Price'},
                {title: 'Status'},
                {title: 'Create Date'},
                {title: 'Action'}
            ];
            var data = [];
            var option = '';
            for(var i in alldata){
                option = "<i class='fa fa-pencil-square-o' data-toggle='modal' data-target='#Mymodal' onclick='editData(" +
                alldata[i][0] +
                ")'></i> | <i class='fa fa-trash' onclick='deleteData(" +
                alldata[i][0] + ")'></i> ";
                data.push([alldata[i][0], alldata[i][1], alldata[i][2], alldata[i][3], alldata[i][4], alldata[i][5], alldata[i][6], alldata[i][7], option]);
            }
            console.log(data);
            $('#table_id').DataTable({
                destroy: true,
                data: data,
                columns: columns
            });
        },
        error: function (e){
            console.log(e.responseText);
        }
    });
}

function setDataToSelect(myselect, myjson, caption){
    try{
        var sel = $(myselect);
        sel.empty();
        sel.append('<option value="">' + caption + '</option>');
        $.ajax({
            url: myjson,
            dataType: 'json',
            success: function (s){
                for(var i = 0; i < s.length; i++){
                    sel.append('<option value="' + s[i][0] + '">'+ s[i][1] + '</option>');
                }
                
            }, error: function (e){
                console.log(e.responseText);
            }
        });
    }catch(err){
        console.log(err.message);
    }
}

$(document).ready(function(){
    displayData();
    setDataToSelect('#txtCategoryId', 'product_json.php?data=get_category', "--Category--");
    setDataToSelect('#txtStatusId', 'product_json.php?data=get_status', "--Status--");
});

$('#btnAdd').click(function (){

    $("#txtName").val("");
    $("#txtCategoryId").val("");
    $("#txtQty").val("");
    $("#txtCost").val("");
    $("#txtPrice").val("");
    $("#txtStatusId").val("");
    $("#btnSave").text("Insert");
    
});

var product_id;
function editData(id){
    $("#btnSave").text("Update");
    product_id = id;

    $.ajax({
        url: 'product_json.php?data=get_byid',
        data: '&pid=' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data){
            $("#txtName").val(data[0][1]);
            $("#txtCategoryId").val(data[0][2]);
            $("#txtQty").val(data[0][3]);
            $("#txtCost").val(data[0][4]);
            $("#txtPrice").val(data[0][5]);
            $("#txtStatusId").val(data[0][6]);
        },
        error: function (ex){
            console.log(ex.responseText);
        }
    });
}

$("#btnSave").click(function (){
    var form_data = $("#form").serialize();
    if($("#btnSave").text() == "Insert"){
        //Insert
        $.ajax({
            type: 'POST',
            url: 'product_json.php?data=add_product',
            data: form_data,
            dataType: 'json',
            success: function (data){
                alert(data);
                displayData();
                $("#Mymodal").modal('hide');
            },
            error: function (ex){
                console.log(ex.responseText);
            }
        });
    }else{
        //Update
        $.ajax({
            type: 'POST',
            url: 'product_json.php?data=update_product&pid=' + product_id,
            data: form_data,
            dataType: 'json',
            success: function (data){
                alert(data);
                displayData();
                $("#Mymodal").modal('hide');
            },
            error: function (ex){
                console.log(ex.responseText);
            }
        });
    }
});

function deleteData(id){
    if(confirm('Are you sure?')){
        $.ajax({
            type: 'GET',
            url: 'product_json.php?data=delete_product&pid=' + id,
            dataType: 'json',
            success: function (data){
                alert(data);
                displayData();
            },
            error: function (ex){
                console.log(ex.responseText);
            }
        });
    }
}


