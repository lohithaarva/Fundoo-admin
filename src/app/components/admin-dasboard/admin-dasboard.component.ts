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

    $(document).ready(function () {
      $(function () {
        $.ajax({
          url: "http://34.213.106.173/api/user/getAdminUserList",
          type: "GET",
          success:function(response){
           
            if(response){
              console.log(response)
              var arr=[];
              for(var i=0;i<response.data.data.length;i++){
                arr.push([i,response.data.data[i].firstName,response.data.data[i].lastName,response.data.data[i].email,response.data.data[i].service])
              }
              $('#tableList').DataTable({
                data:arr,
                deferRender: true,
                scrollY: 200,
                scrollCollapse: true,
                scroller: true

              })
            } 
          },
          error: function(error){
            console.log(error);
          } 
        })
        return false;
       
      });

      var token=localStorage.getItem("token")
      console.log(token)
      $(document).ready(function () {
      $.ajax({
        url: "http://34.213.106.173/api/user/UserStatics",
        headers:{
          'Authorization':token
        },
        type: "GET",
        success: function (response) { console.log(response.data.details) 
          var arr = response.data.details
      
     
  var html='';
          for (let index = 0; index < arr.length; index++) {
            html += "<div class='col-sm-6'><div class='card'>";
            html += "<div class='card-header'>" + arr[index].service+" </div>";
            html += "<div class= 'card-body'>" + arr[index].count+" </div>";
            html +="</div></div>";
          }
        
          $("#services").html(html);
        }
      });
    });  

    }); 
    
  

  //   $.ajax({
  //     url: "http://34.213.106.173/api/user/UserStatics",
  //     data: { },
  //     type: "GET",
  //     beforeSend: function(xhr){xhr.setRequestHeader('X-Test-Header', 'test-value');},
  //     success: function() { alert('Success!'); }
  //  });
  }
  }
  