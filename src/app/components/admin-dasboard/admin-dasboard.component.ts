/* Purpose : Admin Dashboard page 
* @description 
* @file : admin-dashboard.component.ts 
* @author : Lohithashree
*/
/* Importing components, jquery and datatables */
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-scroller';

@Component({
  selector: 'app-admin-dasboard',
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.css']
})
export class AdminDasboardComponent implements OnInit {

  constructor() { }
  

  ngOnInit() {

    $("#btn").click(function () {
      $(location).attr('href', "qanda")
    })
    
    /* Getting API of the userlist, who are registered */
    $(document).ready(function () {
      $(function () {
        $.ajax({
          url: "http://34.213.106.173/api/user/getAdminUserList",
          type: "GET",
          success: function (response) {

            if (response) {
              console.log(response)
              var arr = [];
              for (var i = 0; i < response.data.data.length; i++) {
                arr.push([i + 1, response.data.data[i].firstName, response.data.data[i].lastName, response.data.data[i].email, response.data.data[i].service])
              }
              var table = $('#tableList').DataTable({
                data: arr,
                responsive: true,
                // "serverSide": true,
                // deferRender: true,
                // scrollY: 200,
                // scrollCollapse: true,
                // scroller: true

              });

              /* Function when clicked, triggers the particular row selection 
                 according to the index value */

              $('#tableList tbody').on('click', 'tr', function () {
                var myindex = table.row(this).index();

                /*  Binding the data and getting response of the particular 
                    attribute defined */

                console.log(response.data.data[myindex].firstName)
                $("#firstName").text(response.data.data[myindex].firstName);
                $("#lastName").text(response.data.data[myindex].lastName);
                $("#phoneNumber").text(response.data.data[myindex].phoneNumber);
                $("#role").text(response.data.data[myindex].role);
                $("#service").text(response.data.data[myindex].service);
                $("#createdDate").text(response.data.data[myindex].createdDate);
                $("#email").text(response.data.data[myindex].email);

                $("#myDataPopup").click();   // triggers the modal function 
              });
            }
          },
          error: function (error) {
            console.log(error);
          }
        })
        return false;

      });

      /* Getting the details of number of service modes provided */

      var token = localStorage.getItem("token")
      console.log(token)
      $(document).ready(function () {
        $.ajax({
          url: "http://34.213.106.173/api/user/UserStatics",
          headers: {
            'Authorization': token
          },
          type: "GET",
          success: function (response) {
            console.log(response.data.details)
            var arr = response.data.details


            var html = '';
            for (let index = 0; index < arr.length; index++) {
              html += "<div class='col-sm-6'><div class='card' style='box-shadow: 10px 10px 10px'>";
              html += "<div class='card-header text-center text-white' style='background-image: linear-gradient(to right, rgb(0, 0, 0), rgb(67, 67, 67))'>" + arr[index].service + " </div>";
              html += "<div class= 'card-body text-center'>" + arr[index].count + " </div>";
              html += "</div></div>";
            }
            $("#services").html(html);
          }
        });
      });

      /* calling API for the the process of clearing token of the 
         particular user who is signning of  */

      $('#logout').click(function () {
        console.log(localStorage.getItem("token")); //getting token and storing in localstorage
        // window.location.href="/admin-dashboard";

        $.ajax({
          url: "http://34.213.106.173/api/user/logout",
          headers: {
            'Authorization': localStorage.getItem("token")
          },
          type: "POST",
          success: function (response) {
            // console.log(response);
            console.log("logout successful");
            localStorage.clear(); // clearing token from local storage
            $(location).attr('href', "admin-login") //routing to login page
          },
          error: function (error) {
            console.log(error);
          }
        });
      });
    })
  }

}
