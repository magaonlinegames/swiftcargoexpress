var THIS_ACCOUNT='';
$( document ).ready(
    function(){
        
    }
); 


//23-06-2021
function getMeLogins(code){
  
    firebase.firestore().collection("SHIPPINGSERVICES").where("tracking_number", "==", code)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, "OCW DATE => ", doc.data());
            var account = doc.id;
            THIS_ACCOUNT = account;
            $('#LOGIN-PHASE .btn').hide();
            $('#loader-1').removeClass('hide');
            setTimeout(function(){
                $('#LOGIN-PHASE').slideUp();
                $('.ACCOUNT_01').removeClass('hide');
                GETSHIPPINGACCOUNT(THIS_ACCOUNT);
                GETTRACKINGUPDATE(THIS_ACCOUNT);
                $('#login_track_btn').show();

               
            },3000);
        });
    })
    .catch((error) => {
        console.log("Error getting LOGINS INFO: ", error);
        $('#login_track_btn').show();

        $('#LOGIN-PHASE blockquote').text('The tracking number you entered did not match our records. Please double-check and try again.');
            setTimeout(function(){$('#LOGIN-PHASE blockquote').text('')},6000);
    });
}
//END 23-06-2021
// APRIL 21 2023 9:19
function GETSHIPPINGACCOUNT(account){
    firebase.firestore().collection("SHIPPINGSERVICES").doc(account)
    .get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            //UPDATE MADE ON 24/07/2021
            // 2023 APRIL  2023 - 9:18 PM ***
            $('#CONSIGNMENT_MAP_IFRAME_GOD').attr("src", doc.data().map);

            $('#CONSIGNMENT_STATUS').text(doc.data().consignment_status);
            $('#CONSIGNMENT_DELIVERY_TIME').text(doc.data().date_of_arrival);
            $('#CONSIGNMENT_PROGRESS').css('width', doc.data().progress);
            $('#CONSIGNMENT_ORIGIN_PORT').text(doc.data().origin_port);
            $('#CONSIGNMENT_VESSEL').text('OMB78110');
            $('#CONSIGNMENT_DESTINATION_PORT').text(doc.data().destination_port);
            $('#CONSIGNMENT_ITEM').text(doc.data().item_being_shipped);
            $('#CONSIGNMENT_ITEM_QUANTITY').text(doc.data().item_quantity);
            $('#CONSIGNMENT_ITEM_WEIGHT').text(doc.data().item_weight);
            $('#CONSIGNMENT_TRACKING_NUMBER').text(doc.data().tracking_number);
            $('#CONSIGNMENT_SHIPMENT_DATE').text(doc.data().shipment_date);
            $('#CONSIGNMENT_BILL_OF_LADEN').text(doc.data().bill_of_laden);
            $('#CONSIGNMENT_CONTAINER_NUMBER').text(doc.data().container_number);

            $('#CONSIGNMENT_SENDER').text(doc.data().sender_name);
            $('#CONSIGNMENT_SENDER_ADDRESS').text(doc.data().sender_address);
            $('#CONSIGNMENT_SENDER_EMAIL').text(doc.data().sender_email);
            $('#CONSIGNMENT_SENDER_CONTACT').text(doc.data().sender_contact_number);

            $('#CONSIGNMENT_RECEIVER').text(doc.data().receiver_name);
            $('#CONSIGNMENT_RECEIVER_ADDRESS').text(doc.data().receiver_address);
            $('#CONSIGNMENT_RECEIVER_EMAIL').text(doc.data().receiver_email);
            $('#CONSIGNMENT_RECEIVER_NUMBER').text(doc.data().receiver_contact_number);


            $('#tracking_number').text(doc.data().tracking_number);
            $('#shipment_date').text(doc.data().shipment_date);
            $('#bill_of_laden').text(doc.data().bill_of_laden);
            $('#container_number').text(doc.data().container_number);
            $('#carrier').text(doc.data().carrier);
            $('#item_being_shipped').text(doc.data().item_being_shipped);
            $('#item_quantity').text(doc.data().item_quantity);
            $('#item_weight').text(doc.data().item_weight);
            $('#origin_port').text(doc.data().origin_port);
            $('#ts_port').text(doc.data().ts_port);
            $('#destination_port').text(doc.data().destination_port);
            $('#sender_name').text(doc.data().sender_name);
            $('#sender_address').text(doc.data().sender_address);
            $('#sender_email').text(doc.data().sender_email);
            $('#sender_contact_number').text(doc.data().sender_contact_number);
            $('#receiver_name').text(doc.data().receiver_name);
            $('#receiver_address').text(doc.data().receiver_address);
            $('#receiver_email').text(doc.data().receiver_email);
            $('#receiver_contact_number').text(doc.data().receiver_contact_number);


        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function loginUser(){
    $('#login_track_btn').hide();
    var number = $.trim($('#login_number').val().toLowerCase());
    console.log('User code: '+ number);

    if (number != '') {
        //23-06-2021
        getMeLogins(number);
        //END 23-06-2021
    }else{
        $(".LOGIN blockquote").text('Enter your tracking code (eg: XYZ123456789XYZ)');
        setTimeout(function(){ $(".login-bx blockquote").text('');},3000);
        $('#login_track_btn').show();

    }

    setTimeout(
        function(){
            $('.login-bx blockquote').text('Tracking number invalid.');
            $('#login_track_btn').show();

        },8000
    );

    setTimeout(
        function(){
            $('.login-bx blockquote').text('');
            $('#login_track_btn').show();

        },15000
    );
}

function GETTRACKINGUPDATE(which_acc){
    firebase.firestore().collection("SHIPPING_TRACKING").orderBy("number", "desc")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            if (doc.data().account == which_acc) {
                if (doc.data().danger == '1') {
                    $('#CONSIGNMENT_TRACKING').append('<li> <i class="material-icons red-text">warning</i> <span class="tuSTATUS">'+doc.data().move+'</span> <span class="tuADDRESS txtG red-text">'+doc.data().location+'</span> <span class="tuDATE txtG">'+doc.data().date+'</span>  </li>');
                }else{
                    $('#CONSIGNMENT_TRACKING').append('<li> <i class="material-icons">directions_boat</i> <span class="tuSTATUS">'+doc.data().move+'</span> <span class="tuADDRESS txtG">'+doc.data().location+'</span> <span class="tuDATE txtG">'+doc.data().date+'</span>  </li>');
                    $('#tracking_update_section').append('<tr><td id="location">'+doc.data().location+'</td><td id="moves">'+doc.data().move+'</td><td id="date">'+doc.data().date+'</td><td id="vessel">'+doc.data().vessel+'</td></tr>');
                }
                
            }
            
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

function mapping(map){
    $("iframe").attr("src",map);
}

function UIFORSHIPMENT(){
    $('.USERDETAILS').append('di');
}