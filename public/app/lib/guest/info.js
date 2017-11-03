/*@eProject Technology, author: Harjito*/
function showInfo() {
  var html = '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h2 class="modal-title"><span class="fa fa-' + contentInfo.icon + '"></span> ' + contentInfo.title +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
    '<span aria-hidden="true">&times;</span>' +
    '</button></h2>' +
    '</div>' +
    '<div class="modal-body">' +
    '<div class="jumbotron">'+
    '<h1>'+contentInfo.info.title+'</h1>'+
    '<p>'+contentInfo.info.content+'</p>'+
    '</div>'+
    '</div>'+
    '<div class="modal-footer">' +
    '</div>'
  $('#dialog-body').html(html).removeClass('form').removeClass('confirm').addClass('reader');
}
var contentInfo = {
  title: 'Informasi',
  icon: 'info',
  footer: [
    'website ',
    'email'
  ],
  info: {
    title: 'Lorem Ipsum',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  }
}
