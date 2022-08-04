
    //displayData Function
	function displayData(){
		$.ajax({
				url: 'sale_json.php?data=get_sale',
				type:'GET',
				dataType : 'json',
				success:function(alldata){   
					var columns = [{ title : "Id"},
                    			{ title: "Date"}, 
                    			{ title: "Name"}, 
                    			{ title: "Quantity" },
                    			{ title: "Price" },  
                    			{ title: "Amount" },    
                    			{ title: "Action"}];
					var data = [];
					var option= '';
					for ( var i in alldata ) {
						option = " <i class='fa-solid fa-pen-to-square' data-toggle='modal' data-target='#myModal' onclick='editData(" +
                alldata[i][0] +
                ")'></i> | <i class='fa-solid fa-trash fa-5' onclick='deleteData("+ alldata[i][0] + ")'></i>";
						data.push([alldata[i][0], alldata[i][1], alldata[i][2], alldata[i][3],'$' + alldata[i][4],'$' +  Number(alldata[i][5]).toFixed(2), option]);
					}
					console.log(data);
					$('#table_id').DataTable({
						destroy : true,
						data : data,
						columns: columns
					});
				},
				error: function (ex){
					console.log(ex.responseText);
				}
			});//ajax
		}

		//load date to select 
		function setDataToselect(myselect,myjson,caption){
			try{
				var sel = $(myselect);
				sel.empty();
				sel.append('<option value="">' + caption + '</option>');
				$.ajax({
					//type: 'POST',
					url: myjson,
					//data: form_data,
					dataType: 'json',
					success: function (s){
						for( var i = 0; i < s.length; i++){
							sel.append('<option value="' + s[i][0] + '">'+ s[i][1]  + '</option');
						}
					},error: function (ex){
						console.log(ex.responseText);
					}
				});
			}catch(err){
				console.log(err.message);
			}
		}

			//Query load
		$(document).ready(function(){
			displayData();
			setDataToselect('#txtproduct','sale_json.php?data=get_product',"--Product--");
		});

			//select Product
			$("#txtproduct").change(function(){
				//Insert
				$.ajax({
				 type: 'GET',
				 url: 'sale_json.php?data=get_bypcode',
				 data: '&pcode=' + this.value,
				 dataType: 'json',
				 success: function (data){
					 $('#txtsaleprice').val(data[0][5]);
				 },
				 error: function (ex){
					 console.log(ex.responseText);
				 }
			 });
		 })

		//btnsum button
		$("#btnsum").click(function(){
			$("#txtsaleqty").val(Number($('#txtsaleqty').val())+1);
			var amount = Number($('#txtsaleqty').val()) * Number($('#txtsaleprice').val());
			$("#txtamount").val(amount.toFixed(2));
		});
		
		//btnsub Button 
		$("#btnsub").click(function(){
			var qty = Number($(txtsaleqty).val());
			if(qty > 1){
				$("#txtsaleqty").val(qty-1);	
				var amount = Number($('#txtsaleqty').val()) * Number($('#txtsaleprice').val());
				$("#txtamount").val(amount.toFixed(2));
			}
		});
		

		//AddNew Button 
		$("#btnadd").click(function(){
			var today = new Date();
			var myformat = today.getFullYear() + "-" + ((today.getMonth() < 9 ) ? "0" : "") + 
			String(today.getMonth() + 1) + "-" + ((today.getDate() < 10 ) ? "0" : "") +
			String(today.getDate());

			$('#txtsaledate').val(myformat);
			$('#txtproduct').val("");
			$('#txtsaleprice').val("");
			$('#txtsaleqty').val("1");
			$('#txtamount').val("?");
			$('#btnsave').text("Insert");
		});

		var sale_id;
		//editData()
		function editData(id){
            $('#btnsave').text("update")
			sale_id = id;
			$.ajax({
				url: 'sale_json.php?data=get_byid',
				data: '&saleid=' + id,
				type:'GET',
				dataType : 'json',
				success:function(data){   
					$("#txtsaledate").val(data[0][1]);
					$("#txtproduct").val(data[0][2]);
					$("#txtsaleqty").val(data[0][3]);
					$("#txtsaleprice").val(data[0][4]);
					amount = Number(data[0][3]) * Number(data[0][4]);
					$("#txtamount").val(amount.toFixed(2));
				},
				error: function (ex){
					console.log(ex.responseText);
				}
			});//ajax
	    }

		//Save Button
		$('#btnsave').click(function(){
			var eThis = $(this);
			var Parent = eThis.parents('.frm');
			var product = Parent.find('#txtproduct');
			if(product.val()==''){
				alert("Please choose product!");
				product.focus();
				return;
			}
			var form_data = $('#form').serialize();
			if($('#btnsave').text()=="Insert"){
				//Insert
				$.ajax({
					type: 'POST',
					url: 'sale_json.php?data=add_sale',
					data: form_data,
					dataType: 'json',
					success: function (data){
						alert(data);
						displayData();
						$('#myModal').modal('hide');
					},
					error: function (ex){
						console.log(ex.responseText);
					}
				});
			}else{
				//Update
				$.ajax({
					type: 'POST',
					url: 'sale_json.php?data=update_sale&saleid='+ sale_id,
					data: form_data,
					dataType: 'json',
					success: function (data){
						alert(data);
						displayData();
						$('#myModal').modal('hide');
					},
					error: function (ex){
						console.log(ex.responseText);
					}
				});
			}
		});

		function deleteData(id){
			//confirm delate
			if (confirm('Are you sure?')) {
						$.ajax({
						type:'GET',
						url: 'sale_json.php?data=delete_sale&saleid=' + id,	
						dataType : 'json',
						success:function(data){   
							alert(data);
							displayData();
						},
						error: function (ex){
							console.log(ex.responseText);
					}
				});//ajax
			}
		}