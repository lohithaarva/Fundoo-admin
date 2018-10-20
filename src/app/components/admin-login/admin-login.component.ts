/* Purpose : Admin Login page 
* @description 
* @file : admin-login.component.ts 
* @author : Lohithashree
*/
/* Importing components, jquery and datatables */


import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor() { }
  data: any = {}
  ngOnInit() {
    if (localStorage.getItem("token")) {
      $(location).attr('href', "admin-dashboard")
    }
    $(document).ready(function () {
      $("#btn").click(function () {

        var email = $('#email').val();
        var password = $('#password').val()
        var indexat = email.indexOf("@");
        var indexdot = email.indexOf(".");
        if (email == "") {
          // alert('Please enter your email');
          $('#email').focus();
          $('#msg').text("Enter email id");
          return;
        }
        else if (password == "") {
          // alert("please enter your password");
          $("#password").focus();
          $('#msg').text("Enter password");
          return;
        }
        else if (indexat < 1 || (indexdot - indexat) < 2) {
          // alert("please enter valid email id")
          $("#email").focus();
          $('#msg').text("Enter valid email id");
          return;
        }
        $.ajax({
          url: "http://34.213.106.173/api/user/adminLogin",
          type: "POST",
          data: {
            "email": email,
            "password": password
          },
          dataType: "json",
          success: function (response) {

            if (response) {
              console.log(response);
              localStorage.setItem("token", response.id);
              $(location).attr('href', "admin-dashboard")
            }
            error => {
              console.log("error")
            }
            $('#msg').text("")
          }

        })
        return false;

      });
    });
  }


}

