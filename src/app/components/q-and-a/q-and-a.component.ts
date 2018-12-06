import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-scroller';

@Component({
  selector: 'app-q-and-a',
  templateUrl: './q-and-a.component.html',
  styleUrls: ['./q-and-a.component.css']
})
export class QAndAComponent implements OnInit {


  ngOnInit() {

    $("#goBackToAdmin").click(function () {
      $(location).attr('href', "admin-dashboard")
    })

    /**calling jQuery's $ function, passing to it the document object */
    /** ready event occurs when the DOM loaded */
    $(document).ready(function () {
      var token = localStorage.getItem('token');
      var questionArray = [];

      /**AJAX is a technique for accessing web servers from a web page. */
      $.ajax({
        type: 'GET',
        url: 'http://34.213.106.173/api/questionAndAnswerNotes/getUnApprovedAnswer',
        dataType: "json",
        headers: {
          'Authorization': token,
        },

        /**error callback of $.ajax if error occcurs */
        error: function (response) {
          console.log('error');
          return false;

        },/**success is callback of $.ajax */

        success: function (response) {
          var questionId = [];
          console.log("successfull");
          console.log(response.data);
          for (var i = 0; i < response.data.length; i++) {
            questionArray.push([i + 1, response.data[i].message]);
            questionId.push(response.data[i])
          }

          var questionArray1 = $('#example').DataTable({
            data: questionArray,
            scroller: true,
            scrollY: 400,
            scrollX: false,

            "columnDefs": [{
              "targets": -1,
              "defaultContent":
                '<div class="btn-group">' +
                '<button class="newBtn btn btn-dark btn-sm" type="button">Accept</button>' + '<div>' + '</div>'
                + '<button class="Mybtn btn btn-dark btn-sm" style=margin-left:10px  type="button">Reject</button>'
                + '</div>'
            }]
          });
          parent;
          $('#example').on('click', '.newBtn', function () {

            var RowIndex = $(this).closest('tr');
            var data = questionArray1.row(RowIndex).data();
            // console.log('questioniduyhj',data);
            // console.log('questionid...',questionId[0].parentId);

            for (var i = 0; i < questionId.length; i++) {
              if (data[1] == questionId[i].message) {
                this.parent = questionId[i].id;
                location.reload(true); 

              }

            }
            // console.log('questionid...',this.parent);

            $.ajax({
              type: 'POST',
              url: 'http://34.213.106.173/api/questionAndAnswerNotes/approve/' + this.parent,
              dataType: "json",
              isApproved: true,
              headers: {
                'Authorization': token,
              },


              /**error callback of $.ajax if error occcurs */
              error: function (response) {
                console.log('error');
                return false;

              },/**success is callback of $.ajax */
              success: function (response) {
                console.log('success', response);
                console.log(response.data);
                $(this).addClass('row_selected');
                alert('approved');
                location.reload(true); 

              }

            });


          });
          var parentNew;
          $('#example').on('click', '.Mybtn', function (e) {

            var RowIndex = $(this).closest('tr');
            var data = questionArray1.row(RowIndex).data();
            console.log('questioniduyhj', data);
            console.log('questionid...', questionId[0].parentId);

            for (var i = 0; i < questionId.length; i++) {
              if (data[1] == questionId[i].message) {
                this.parentNew = questionId[i].id;

              }

            }
            console.log('questionid...', this.parentNew);

            $.ajax({
              type: 'POST',
              url: 'http://34.213.106.173/api/questionAndAnswerNotes/reject/' + this.parentNew,
              dataType: "json",
              headers: {
                'Authorization': token,
              },

              /**error callback of $.ajax if error occcurs */
              error: function (response) {
                console.log('error');
                return false;

              },/**success is callback of $.ajax */
              success: function (response) {
                console.log('success', response);
                console.log(response.data);
                // $(this).find(".complete-tick").css('display','block');
                // e.preventDefault();
                alert('UnApproved')
                location.reload(true); 


              }

            });


          });

          return false;

        },

      });


    });


  }



}