/**
 * Create by
 * User: DAZONIPSE
 * Date: 30/03/2017
 * Time: 08:00 pm
 */

/*/////////////////////////////////////////////////////////////////////////////////////////
                                    MIS FUNCIONES
//////////////////////////////////////////////////////////////////////////////////////////*/
//Abrir los diferentes modales del sistema
$(document).ready(function(){
    $("#crearU").click(function(){$("#AUsuario").openModal();});
    
    $("#crearT").click(function(){$("#ATrabajador").openModal();});
});

//Cargar pagina
function gotopage(mypage) {
    $(location).attr('href',mypage);
}

/*/////////////////////////////////////////////////////////////////////////////////////////
                                    FIN MIS FUNCIONES
//////////////////////////////////////////////////////////////////////////////////////////*/



/*/////////////////////////////////////////////////////////////////////////////////////////
                                FUNCIONES SOBRE Id's Tablas
//////////////////////////////////////////////////////////////////////////////////////////*/
$('#BuscarUsuarios').on('keyup', function(){
        var table = $('#TblMaster').DataTable();
        table.search(this.value ).draw();

        //$("#TblMaster_length, #TblMaster_filter, #TblMaster_info, #TblMaster_paginate").hide();
    }
);

$('#TblMaster').DataTable({
    columnDefs:[{
        targets: [ 0, 1, 2 ],
        className: 'mdl-data-table__cell--non-numeric'
    }]
});

/*$("#TblTrabajadores").DataTable({
    "ordering": false,
    "info": false,
    "bPaginate2": false,
    "bfilter": false,
    "language": {
        "emptyTable": "No hay datos disponible en la tabla",
        "lengthMenu": "_MENU_",
        //"search":'<i style="color:#039be5; font-size:40px;" class="material-icons">search</i>',
         "loadingRecords": "",
         "paginate": {
             "first":    "Primera",
             "last":     "Última ",
             "next":     "Anterior",
             "previous": "Siguiente"
         }
    }
});*/

/*/////////////////////////////////////////////////////////////////////////////////////////
                                FIN FUNCIONES SOBRE USUARIO
//////////////////////////////////////////////////////////////////////////////////////////*/



/*/////////////////////////////////////////////////////////////////////////////////////////
                                    FUNCIONES SOBRE USUARIO
//////////////////////////////////////////////////////////////////////////////////////////*/
function EnviarUsuario(){
    $('#lblUsuario, #lblNombreC, #lblPass, #lblPassC, #lblRol').hide();
    
    var user = $('#Usuario').val(); var nombre = $('#NombreC').val();
    var clave = $('#Pass').val();   var clave2 = $('#PassC').val();
    var rol = $('#rol option:selected').val();
    
    //alert(rol);
    
    if (user==""){$('#lblUsuario').show(); return false;
    }else if (nombre==""){$('#lblNombreC').show(); return false;
    }else if (clave==""){$('#lblPass').show();return false;
    }else if (clave2=="" || clave!=clave2) {$('#lblPassC').show();return false;
    }else if (rol=="") {$('#lblRol').show();return false;}

    $('#Adduser').hide();
    
    $.ajax({
        url: "GuardarUsuario/"+user+"/"+nombre+"/"+clave+"/"+rol,
        type: "post",
        async:true,
        success:
            function(){
                swal({title: "EL USUARIO SE AGREGO CORRECTAMENTE!",
                      type: "success",
                      confirmButtonText: "CERRAR",
                }).then(
                    function(){gotopage("Usuarios");}
                )
            }
    });
}

function CambiarPass(IdUser){
    var pass = '';

    swal({
        title: 'Escriba Contraseña',
        input: 'password',
        inputPlaceholder: "Nueva Contraseña",
        confirmButtonText: 'SIGUIENTE',
        showCloseButton: true,
        showLoaderOnConfirm: true,
        preConfirm: function (password) {
            return new Promise(function (resolve, reject) {
                setTimeout(function() {
                    if (password == '') {
                    reject('La Contraseña no puede ser vacia!')
                    } else {
                    resolve()
                    }
                }, 900)
            })
        },
        allowOutsideClick: false
    }).then(function (password) {
        var pass = password;

        swal({
            title: 'Confirma Contraseña',
            input: 'password',
            inputPlaceholder: "Confirma Contraseña",
            confirmButtonText: 'CAMBIAR',
            showCloseButton: true,
            showLoaderOnConfirm: true,
            preConfirm: function (password) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function() {
                        if (password == '') {
                            reject('La Contraseña no puede ser vacia!')
                        } else if (password != pass) {
                            reject('Las Contraseña no son iguales!')
                        }else {
                            resolve()
                        }
                    }, 900)
                })
            },
            allowOutsideClick: false
        }).then(function (password) {
            $.ajax({
                url: "ClaveUsuario/"+IdUser+"/"+password,
                type: "post",
                async:true,
                success:
                    function(){
                        swal({title: 'Bien!',
                              text: 'La Contraseña se Cambio Correctamente!',
                              type: 'success',
                              confirmButtonText: 'CERRAR',
                        }).then(
                            function(){gotopage("Usuarios");}
                        )
                    }
            });
        })
    })
}

function BorrarUsuario(IdUser, Estado){
    if(Estado==1){var miMSS = "¿DESEA CAMBIAR EL ESTADO ACTIVO AL USUARIO?";
    }else{var miMSS = "¿DESEA CAMBIAR EL ESTADO INACTIVO AL USUARIO?";}
    
    swal({ title: " ",
           text: miMSS,
           type: 'warning',
           showCloseButton: true,
           confirmButtonColor: '#831F82',
           confirmButtonText: 'CAMBIAR'
        }).then(function(){
            $.ajax({ url: "EliminarUsuario/"+IdUser+"/"+Estado,
                type: "post",
                async:true,
                success:
                    function(){
                        swal({title: "EL USUARIO SE CAMBIO CORECTAMENTE!",
                            type: "success",
                            confirmButtonText: "CERRAR",
                        }).then(
                            function(){gotopage("Usuarios");}
                        )}
        })
    })
}
/*/////////////////////////////////////////////////////////////////////////////////////////
                                FIN FUNCIONES SOBRE USUARIO
//////////////////////////////////////////////////////////////////////////////////////////*/

/*/////////////////////////////////////////////////////////////////////////////////////////
                                    FUNCIONES SOBRE TRABAJADOR
//////////////////////////////////////////////////////////////////////////////////////////*/
function EnviarTrabajador(){
    $('#lblNombreC, #lblCargo, #lblTurno').hide();
    
    var nombre = $('#NombreC').val();
    var cargo = $('#cargo option:selected').val();
    var turno = $('#turno option:selected').val();
    
    //alert(rol);
    
    if (nombre==""){$('#lblNombreC').show(); return false;
    }else if (cargo==""){$('#lblCargo').show();return false;
    }else if (turno=="") {$('#lblTurno').show();return false;}
    
     $('#AddTrabajador').hide();
    
    $.ajax({
        url: "GuardarTrabajador/"+nombre+"/"+cargo+"/"+turno,
        type: "post",
        async:true,
        success:
            function(){
                swal({title: "EL TRABAJADOR SE AGREGO CORRECTAMENTE!",
                      type: "success",
                      confirmButtonText: "CERRAR",
                }).then(
                    function(){gotopage("Trabajadores");}
                )
            }
    });
}

function BorrarTrabajador(IdUser, Estado){
    if(Estado==1){var miMSS = "¿DESEA CAMBIAR EL ESTADO ACTIVO AL TRABAJADOR?";
    }else{var miMSS = "¿DESEA CAMBIAR EL ESTADO INACTIVO AL TRABAJADOR?";}
    
    swal({ title: " ",
           text: miMSS,
           type: 'warning',
           showCloseButton: true,
           confirmButtonColor: '#831F82',
           confirmButtonText: 'CAMBIAR'
        }).then(function () {
            $.ajax({ url: "EliminarTrabajador/"+IdUser+"/"+Estado,
                     type: "post",
                     async:true,
                     success:
                        function(){
                            swal({title: "EL TRABAJADOR SE CAMBIO CORECTAMENTE!",
                                  type: "success",
                                  confirmButtonText: "CERRAR",
                            }).then(
                                function(){gotopage("Trabajadores");}
                            )
                        }
                })
        })
}

function CalendarWK(Iduser, Nuser){
    $("h6#TxtNombre").html(Nuser);

    $('#CWorker').openModal(
        {   dismissible: false, // Modal can't be dismissed by clicking outside of the modal 
            //opacity: .5, // Opacity of modal background
            //in_duration: 300, // Transition in duration 
            //out_duration: 200, // Transition out duration 
            //ready: function() {}, // Callback for Modal open 
            complete: function() { gotopage("Trabajadores");}   // Callback for Modal close 
        }
    );
    
	var calendar =  $("div#calendar").fullCalendar({
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        dayNames: ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'],
        dayNamesShort: ['Dom', 'Lun','Mar','Mié','Jue','Vie','Sáb'],
        defaultDate: Date(),
		editable: true,
		height:480, 
        eventLimit: true, // allow "more" link when too many events
        events: "Calendario/"+Iduser,
        selectable: true,
        selectHelper: true,
        dayClick: function(date) {
             Fecha = $.fullCalendar.formatDate(date, "YYYY-MM-D");

             $.ajax({url: "FEvento/"+Iduser+"/"+Fecha,
                type: "post",
                async:true,
                success:
                    function(existe){
                        if (existe == 0)
                        {
                            swal({
                                title: 'Digite los Puntos',
                                input: 'number',
                                inputPlaceholder: "Nuevos Puntos",
                                confirmButtonText: 'AGREGAR',
                                showCloseButton: true,
                                showLoaderOnConfirm: true,
                                preConfirm: function (value) {
                                    return new Promise(function (resolve, reject) {
                                    setTimeout(function(){if (value == '') {reject('Los Puntos no pueden ser Vacios!')
                                                               }else{resolve()}
                                                        }, 900
                                              )
                                    })
                                },
                                allowOutsideClick: false
                            }).then(function (value) {
                                $.ajax({url: "GCalendario/"+Iduser+"/"+value+"/"+Fecha,
                                        type: "post",
                                        async:true,
                                        success:
                                        function(){
                                            swal({title: "LOS PUNTOS SE AGREGARON CORECTAMENTE!",
                                                  type: "success",
                                                  confirmButtonText: "CERRAR",
                                            }).then(function(){calendar.fullCalendar("refetchEvents");})
                                        }
                                });
                            })
                        }//FIN del else
                    }//FIN de la funcion
            });

        },
        /*  selectConstraint: {
            start: $.fullCalendar.moment().subtract(1, 'days'),
            end: $.fullCalendar.moment().startOf('month').add(1, 'month')
        },
        
        select: function(start, allDay) {
            if(moment().diff(start, 'days') > 0) {
                calendar.fullCalendar('unselect');
                return false;
            }
           swal({
                title: 'Digite los Puntos',
                input: 'number',
                inputPlaceholder: "Nuevos Puntos",
                confirmButtonText: 'AGREGAR',
                showCloseButton: true,
                showLoaderOnConfirm: true,
                preConfirm: function (value) {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function(){if (value == '') {reject('Los Puntos no pueden ser Vacios!')
                                                               }else{resolve()}
                                             }, 900
                                  )
                    })
                },
                allowOutsideClick: false
            }).then(function (value) {
                    start = $.fullCalendar.formatDate(start, "YYYY-MM-D");
                    
                    $.ajax({url: "GCalendario/"+Iduser+"/"+value+"/"+start,
                        type: "post",
                        async:true,
                        success:
                            function(){
                                swal({title: "LOS PUNTOS SE AGREGARON CORECTAMENTE!",
                                    type: "success",
                                    confirmButtonText: "CERRAR",
                                }).then(function(){calendar.fullCalendar("refetchEvents");})
                            }
                    });
            })
        },*/
        eventClick: function(event) {
            swal({
                title: 'Digite los Puntos',
                input: 'number',
                inputPlaceholder: event.title,
                confirmButtonText: 'CAMBIAR',
                showCloseButton: true,
                showLoaderOnConfirm: true,
                preConfirm: function (value) {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function(){if (value == '') {reject('Los Puntos no pueden ser Vacios!')
                                                               }else{resolve()}
                                             }, 900
                                  )
                    })
                },
                allowOutsideClick: false
            }).then(function (value) {
                    Fecha = $.fullCalendar.formatDate(event.start, "YYYY-MM-D");

                    $.ajax({url: "UCalendario/"+Iduser+"/"+event.Id+"/"+value+"/"+Fecha,
                        type: "post",
                        async:true,
                        success:
                            function(){
                                swal({title: "LOS PUNTOS SE ACTUALIZARON CORECTAMENTE!",
                                    type: "success",
                                    confirmButtonText: "CERRAR",
                                }).then(function(){calendar.fullCalendar("refetchEvents");})
                            }
                    });//FIN del ajax ACTUALIZAR
            })//FIN del then del swal
        }//FIN evento Click
	 });
}


/*ACA PONGO COMENTARIO
$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger2').leanModal();
});

var bandera2 =0;
function generarPdf()
{   
    document.getElementById('reportepdf').submit();
}
function generarExcel()
{
    $('#excel_articulo').val($('#tbArticulos_filter input[type=search]').val());
    $('#excel_laboratorio').val($( "#Filtro1_wrapper #filtroLaboratorio select option:selected").text());
    $('#excel_proveedor').val($('#Filtro1_wrapper #filtroProveedor select option:selected').text());
    document.getElementById('excel').submit();
}
function generarExcel2()
{
    document.getElementById('excel').submit();
}
$('#tblAlvaro').DataTable( {
    "ordering": false,
    "info":     false,
    "bPaginate2" : false,
    "bFilter" : false,
    "language": {
        "emptyTable": "No hay datos disponibles en la tabla",
        "lengthMenu": '_MENU_ ',
        "search": '<i class="tiny material-icons">search</i>',
        "loadingRecords": "",
        "paginate": {
            "first":      "Primera",
            "last":       "Última ",
            "next":       "Anterior",
            "previous":   "Siguiente"
        }
    },
});

$('#Articulos').DataTable( {
    "ordering": false,
    "info":     false,
    "pagingType": "full_numbers",
    "lengthMenu":  [[10,-1], [10,"Todo"]] ,
    "language": {
        "emptyTable": "No hay datos disponibles en la tabla",
        "lengthMenu": '_MENU_ ',
        "search": '<i class="tiny material-icons">search</i>',
        "loadingRecords": "",
        "paginate": {
            "first":      "Primera",
            "last":       "Última ",
            "next":       "Anterior",
            "previous":   "Siguiente"
        }
    },
});

$("#chkPDF").on( 'change', function() {
    if( $(this).is(':checked') ){$( "#txtignorar" ).val("1");}
    else {$( "#txtignorar" ).val("0");
}
});

$(document).ready(function(){
    $.extend( $.fn.dataTable.defaults,{
        "bAutoWidth": true
    });   


    var tableAlder=  $('#tbArticulos').DataTable( {
        "sPaginationType": "full_numbers",
        "aaSorting": [[ 1, "asc" ]],
        "columnDefs": [{ "targets": [ 0, 1, 2 ],
        "className": 'mdl-data-table__cell--non-numeric',
    }],
    "lengthMenu": [[10,50,-1], [10,50,"Todo"]] ,
    "language": {
        "lengthMenu": " _MENU_ ",
        "search":         "",
        "paginate": {
            "first":      "Primero",
            "last":       "Ultimo",
            "next":       "Siguiente",
            "previous":   "Anterior"
        },
        "info":           "Mostrando _START_ a _END_ de _TOTAL_ registro",
        "infoEmpty":      "Mostrando 0 a 0 de 0 registro",
        "infoFiltered":   "(filtrado de _MAX_ registros totales)",
        "zeroRecords":    "No se han encontrado resultados para tu búsqueda",
    },    


    initComplete: function () {
        var contador=1;
        this.api().columns().every( function () {
            var column = this;                    
            var select = $('<select><option value=""></option></select>').appendTo($(column.footer()).empty())
            .on( 'change', function () {
                var val = $.fn.dataTable.util.escapeRegex(
                    $(this).val()                                
                    );               contador++;              
                column
                .search( val ? '^'+val+'$' : '', true, false )
                .draw();
            } );                    
            column.data().unique().sort().each( function ( d, j ) {
                select.append( '<option  value="'+d+'">'+d+'</option>' )
            } );
        } );
    }
} );          

        //$("#tbArticulos_length").hide();
        $("#TblFiltros").appendTo("#DivFiltros > #Filtro1_wrapper");
        $("#tbArticulos_length").appendTo("#DivFiltros > #Filtro2_wrapper");
        $("#tbArticulos_filter").appendTo("#DivFiltros > #Filtro3_wrapper");
        $("#tbArticulos_info").appendTo("#DivFiltros > #Filtro4_wrapper");        
ACA TERMINA ESTE COMENTARIO DE ARRIBA*/

/*EVENTO PARA OCULTAR LAS FILAS QUE TENGAN UN PROMEDIO DE 0 EN LA TABLA*/
/*ACA OTRO COMENTARIO

    $("#test5").on( 'change', function() {
            if( $(this).is(':checked') )
            {
                $( ".ocultar" ).removeClass( "mostrar" ).addClass( "nomostrar" );
                $('#bandera').val('1');
            }
            else {$( ".ocultar" ).removeClass( "nomostrar" ).addClass( "mostrar" );
            $('#bandera').val('0');
        }
    });
    $( "#tbArticulos_length select " ).change(function() {        
          if($("#test5").is(':checked'))
           {$( ".ocultar" ).removeClass( "mostrar" ).addClass( "nomostrar" );}
       else {$( ".ocultar" ).removeClass( "nomostrar" ).addClass( "mostrar" );}
   });

    $( "#tbArticulos_filter input[type=search]").keydown(function() {//alert("ekisde");
            if( $("#test5").is(':checked') )
               {$( ".ocultar" ).removeClass( "mostrar" ).addClass( "nomostrar" );}
           else {$( ".ocultar" ).removeClass( "nomostrar" ).addClass( "mostrar" );}
       });

    $( "#TblFiltros select").change(function() {
            //alert("ekisde");
            if( $("#test5").is(':checked') )
               {$( ".ocultar" ).removeClass( "mostrar" ).addClass( "nomostrar" );}
           else {$( ".ocultar" ).removeClass( "nomostrar" ).addClass( "mostrar" );}
       });

    $('#tbArticulos_wrapper').on('click', '.paginate_button', function () {
        if( $("#test5").is(':checked') )
           {$( ".ocultar" ).removeClass( "mostrar" ).addClass( "nomostrar" );}
       else {$( ".ocultar" ).removeClass( "nomostrar" ).addClass( "mostrar" );}
    }); 
});

function ignorar()
{
    if($("#test5").is(':checked')) {
       $.fn.dataTable.ext.search.push(
        function( settings, searchData, index, rowData, counter ) {
            var min = 0.00;
                                    var valor = parseFloat( searchData[6]); // using the data from the 4th column                              
                                    if (( isNaN( min )) || ( valor != min))                                       
                                    {
                                        return true;
                                    }
                                    return false;
                                }
                                );  
   }
   else {
    $.fn.dataTable.ext.search.push(
        function( settings, searchData, index, rowData, counter ) {
            var min = 0.00;
                                var valor = parseFloat( searchData[6]); // using the data from the 4th column                            
                                return true;                                
                            }
                            );
    }        
}



/*$('input[type="text"]').dblclick(function(){
    $( "#" + $(this).attr("id") ).addClass( "ClssEdited" );
    $( "#Div" + $(this).attr("id")).show("slow");
    Cnt = $(this).val();
    UndEmpaque = $("#"+"FE-"+$(this).attr("id").substring(6, 15).trim()).text();                
    CntUnd = (number_format(Cnt,2).replace(",",'')) * (number_format(UndEmpaque,2).replace(",",''));        
    $("#"+$(this).attr("id")).val(number_format(CntUnd,2));
});
02 ACA TERMINA ESTE OTRO*/


/*ES ES EL 03
function mostrarALVARO() {
    
    if (bandera2==0) {
    $("#mostrarAlvaro").show();
    bandera2=1
    }else{$("#mostrarAlvaro").hide();bandera2=0;}
}

function MUP(key, per,FE,CONTRATO){
    $('#MyBar').show("slow");


    var Row0 = $("#Row-0-"+key).val();
    var Row1 = $("#Row-1-"+key).val();
    var Row2 = $("#Row-2-"+key).val();
    var Row3 = $("#Row-3-"+key).val();
    var Row4 = $("#Row-4-"+key).val();

    Row0 = Row0.replace(",",'');
    Row1 = Row1.replace(",",'');
    if (Row4 != undefined) {
        Row4 = Row4.replace(",",'');    
    }
    

    //if (($("#Row-0-"+key).hasClass("ClssEdited")) || ($("#Row-1-"+key).hasClass("ClssEdited")) ) {
    //    if(($("#Row-0-"+key).hasClass("ClssEdited"))){
    //       console.log("0")
    //        $( "#Row-0-"+key ).removeClass( "ClssEdited" );
    //        $( "#DivRow-0-" + key).hide("slow");
    //        Row0 = parseFloat(Row0) / parseFloat(FE);
    //    }
    //    if(($("#Row-1-"+key).hasClass("ClssEdited"))){
    //        Row1 = parseFloat(Row1) / parseFloat(FE);
    //    }
    //} else {
    //    Row0 = parseFloat(Row0) / parseFloat(FE);
    //    Row1 = parseFloat(Row1) / parseFloat(FE);
    //}       

    $("#Row-0-"+key).val(number_format(Row0,2));
    $("#Row-1-"+key).val(number_format(Row1,2));
        //Row2 = Row2.replace(",",'');
        //Row3 = Row3.replace(",",'');
        
        if (per == 1){
            condicion = "UpdateRow/"+key+"/"+per+"/"+Row0+"/"+Row1+"/"+Row2+"/"+Row3;
        }else{
            condicion = "UpdateRow/"+key+"/"+per+"/"+Row0+"/"+Row1+"/0/0/"+Row4;
        }                 
        
        $.ajax({
            url: condicion,
            type: "get",
            async:true,
            success: function(json){
                if (json==1) {
                    mensaje("ACTUALIZADO CORRECTAMENTE","");
                }else{mensaje("ERROR AL ACTUALIZAR","error");}
                $('#MyBar').hide("slow");                
                //$(location).attr('href',"Articulos");
            }
        });
    }; TERMINA el 03*/