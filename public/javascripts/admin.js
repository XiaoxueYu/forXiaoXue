
$(function () {
  $('.delete').click(function(e){
    console.log('1');
    var target = $(e.target)
    var id = target.data('id')
    var tr = $('.item-id-'+id)

    $.ajax({
      type:'DELETE',
      url:'/admin/meal/list?id' + id
    })
    .done(function(results){
      if(results.success===1){
        if(tr.length>0){
          tr.remove()
        }
      }
    })
  })

})

//ssdddvd