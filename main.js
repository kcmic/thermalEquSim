
$('#rowMA, #rowSHCA,#rowMB, #rowSHCB').hide();

plotGraph();



function calHC(obj){
	//console.log($('#inputHC'+obj));
	$('#inputHC'+obj).val( $('#inputSHC'+obj).val() * $('#inputM'+obj).val() );
}

function calM(obj){
	
	$('#inputM'+obj).val( $('#inputHC'+obj).val() / $('#inputSHC'+obj).val() );
}


function calTf(){
	var CA=parseInt($('#inputHCA').val());
	var CB=parseInt($('#inputHCB').val());
	var TiA=parseInt($('#inputTiA').val());
	var TiB=parseInt($('#inputTiB').val());
	var Tf= ( (CA*TiA)+(CB*TiB) ) / (CA+CB);
	$('#inputTfA').val(Tf);
	$('#inputTfB').val(Tf);
	return {Tf,TiA,TiB, CA,CB} ;

}


// Tf , TiA, TiB : (whole process)
function geneDataPt(Tf, TiA, TiB, CA, CB){

	var curveConst=50;

	//time=[...Array(100).keys()];
	time=[0];

	var arrTA=[TiA];
	var arrTB=[TiB];

	// time.forEach(function(t){
	// 	if (t==0){
	// 		return;
	// 	}else{
	// 		TA_temp=(Q/curveConst)/t+TiA
	// 		TA.push(TA_temp);
	// 	}


	// });

	var i=1;
	while(Math.abs(arrTA[i-1]-Tf)>0.01 || Math.abs(arrTB[i-1]-Tf)>0.01 ){
		var preTA = arrTA[i-1];
		var preTB = arrTB[i-1];
		var newTA = -1*curveConst/CA * (preTA-preTB) + preTA;
		var newTB = -1*curveConst/CB * (preTB-preTA) + preTB;
		arrTA.push(newTA);
		arrTB.push(newTB);
		time.push(i);
		i++;
	}
	// for (var i=1; i<time.length;i++){
	// 	var preTA = arrTA[i-1];
	// 	var preTB = arrTB[i-1];
	// 	var newTA = -1*curveConst/CA * (preTA-preTB) + preTA;
	// 	var newTB = -1*curveConst/CB * (preTB-preTA) + preTB;
	// 	arrTA.push(newTA);
	// 	arrTB.push(newTB);
	// }


	console.log(arrTA);
	console.log(arrTB);

	data[0].y=arrTA;
	data[0].x=time;
	data[1].y=arrTB;
	data[1].x=time;
}




$('#btnStart').click(function(){
	//console.log('hi');
	var nums=calTf();
	//console.log(nums.Tf,nums.TiA,nums.TiB,nums.CA,nums.CB);
	geneDataPt(nums.Tf,nums.TiA,nums.TiB,nums.CA,nums.CB);
	plotGraph();
	$('#squareB').css('background-color','rgb(50,205,50)');
	$('#squareA').css('background-color','rgb(50,205,50)');	
});

function resetGraph(){
	data[0].y=[];
	data[0].x=[];
	data[1].y=[];
	data[1].x=[];
	plotGraph();
}


$('#btnReset').click(function(){
	if ( parseInt($('#inputTiA').val()) > parseInt($('#inputTiB').val()) ){
		$('#squareA').css('background-color','rgb(219, 64, 82)');
		$('#squareB').css('background-color','rgb(55, 128, 191)');
	} else if ( parseInt($('#inputTiA').val()) < parseInt($('#inputTiB').val()) ){
		$('#squareB').css('background-color','rgb(219, 64, 82)');
		$('#squareA').css('background-color','rgb(55, 128, 191)');		
	}else{
		$('#squareB').css('background-color','rgb(50,205,50)');
		$('#squareA').css('background-color','rgb(50,205,50)');	
	}
	resetGraph();

});


//UI function

$('#inputMA, #inputSHCA').change(function(){
	calHC('A');
});

$('#inputMB, #inputSHCB').change(function(){
	calHC('B');
});


$('#optionSHCA, #optionHCA').click(function(){

	$('#ddlHCA>button').text($(this).text());
	if ($(this).attr('id')=='optionSHCA'){
		calM('A');
		$('#rowMA, #rowSHCA').show();
		$('#inputHCA').attr('readonly',true);
	}else{
		calHC('A');
		$('#rowMA, #rowSHCA').hide();
		$('#inputHCA').attr('readonly',false);
	}
	
});

$('#optionSHCB, #optionHCB').click(function(){

	$('#ddlHCB>button').text($(this).text());
	if ($(this).attr('id')=='optionSHCB'){
		calM('B');
		$('#rowMB, #rowSHCB').show();
		$('#inputHCB').attr('readonly',true);
	}else{
		calHC('B');
		$('#rowMB, #rowSHCB').hide();
		$('#inputHCB').attr('readonly',false);
	}
});