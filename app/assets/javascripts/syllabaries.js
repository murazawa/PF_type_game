
$(function() {
  // オブジェクトを変数に代入
  const $yomi = $('#yomi');
  const $mondai = $('#mondai');
  const $finishPanel = $('#finish-panel');
  const $countSelect = $('#count-select');
  const $correctMessage = $('#correct-message');
  const $mistakeMessage = $('#mistake-message');

  const $timeMessage = $('#time-message');
  const $startMessage = $('#start-message');

  // 問題用の変数の初期化
  let char_index = 1;
  let max_length = 5; //　最初の問題

  // 問題数
  let question_number = 1;
  let question_limit = 9;
  let done_questions = {};

  // カウントする変数を３つ宣言
  let typing_cnt = 0; //タイプした合計
  let correct_cnt = 0; //正解タイプ数
  let mistake_cnt = 0; //間違えたタイプ数

  let start_game = false;
  let start_time = 0;

  // 問題
  const MONDAI_LIST = [
    {yomi:'あいうえお', text:'aiueo'},
    {yomi:'かきくけこ', text:'kakikukeko'},
    {yomi:'さしすせそ', text:'sasisuseso'},
    {yomi:'たちつてと', text:'tatituteto'},
    {yomi:'なにぬねの', text:'naninuneno'},
    {yomi:'はひふへほ', text:'hahihuheho'},
    {yomi:'まみむめも', text:'mamimumemo'},
    {yomi:'やゆよ', text:'yayuyo'},
    {yomi:'らりるれろ', text:'rarirurero'},
    {yomi:'わをん', text:'wawonn'},
  ];

  // 最初は問題を隠すhide()
  $yomi.hide();
  $mondai.hide();
  changeQuestionWord(getQuestionNumber());　//最初の問題の設定

  $countSelect.on('change', function(e) {
  question_limit = Number($countSelect.val());
  done_questions = {}; // ここ大事
  changeQuestionWord(getQuestionNumber());
  });


  // #start-buttonで　init();関数の呼び出し
  $('#start-button').on('click', function(e){
    init();
  });


// ゲームを開始したら、最初のメッセージとSelectは隠し、問題を表示
// キーをタイプした時にそれぞれの数を増加 → 1, 2, 3
  $(document).on('keypress', function(e){
    if (!start_game && e.keyCode === 32) { //  スペースでスタート
    $startMessage.hide();
    $countSelect.hide();
    $yomi.show();
    $mondai.show();
    start_game = true;
    start_time = performance.now();
    return;
  } else if (!start_game) {
    return;
  }

    typing_cnt++; // ①

    const $target = $('#char-'+char_index);
    const char = $target.text();
    if (e.key === char) { //入力文字と現在の位置の文字が一緒だったら
      // alert('正解!');
      $target.removeClass('default');
      $target.addClass('correct');
      char_index++;
      correct_cnt++; //正解したとき②
      } else {
      mistake_cnt++; //間違えたとき③
      }

    if (max_length < char_index) {
      question_number++;
      if (question_limit < question_number) {
        finish();
        return;
      }
      changeQuestionWord(getQuestionNumber());
      char_index = 1; //初期化
    }

  });


  function getQuestionNumber(){
    let random_number = Math.floor(Math.random()*9);
    while (done_questions[random_number]!== undefined) {
      random_number = Math.floor(Math.random()*9);
    }
    done_questions[random_number] = random_number
    return random_number;
  }


  // init()関数を実装
// ①各変数の初期s化をする
// ②問題数を３に戻す
// ③最初の問題の表示する
// ④終了メッセージを非表示に、問題エリアを表示する
  function init(){
    char_index = 1;
    question_number = 1;
    question_limit = 9;
    done_question = {};
    typing_cnt = 0;
    correct_cnt = 0;
    mistake_cnt = 0;
    start_game = false;
    start_time = 0;

    $countSelect.val('9');

    changeQuestionWord(getQuestionNumber());
    $finishPanel.addClass('hidden');
    $yomi.hide();
    $mondai.hide();
    $startMessage.show();
    $countSelect.show();
  }



  function finish() {
    $finishPanel.removeClass('hidden');
    $yomi.hide();
    $mondai.hide();
    $correctMessage.text('正解数：' +correct_cnt+'/' +typing_cnt+' ('+ Math.floor(correct_cnt/typing_cnt * 100)+'%)');
    $mistakeMessage.text('間違い数：'+mistake_cnt+'/'+typing_cnt+' ('+ Math.floor(mistake_cnt/typing_cnt * 100)+'%)');
    const end_time = performance.now();
    const typing_time = ( (end_time - start_time) / 1000).toFixed(2);
    $timeMessage.text('かかった時間：'+typing_time+'秒');
}


  function changeQuestionWord(index) {
    const word = MONDAI_LIST[index]['text'];
    max_length = word.length;
    let newHtml = '';
    for (var i = 0; i < max_length; i++) {
      newHtml += '<p id="char-'+(i+1)+'" class="text default">'+word[i]+'</p>';
    }
    $mondai.html(newHtml);
    $yomi.text(MONDAI_LIST[index]['yomi']);
  }

});


// let done_questions = {}; ループしないやつ

// $(function() {
//   // jQueryオブジェクトを変数に代入
//   const $yomi = $('#yomi');
//   const $mondai = $('#mondai');
//   const $finishPanel = $('#finish-panel');
//   const $countSelect = $('#count-select');
//   const $correctMessage = $('#correct-message');
//   const $mistakeMessage = $('#mistake-message');
//   const $timeMessage = $('#time-message');
//   const $startMessage = $('#start-message');

//   // 問題用の変数の初期化
//   let char_index = 1;
//   let max_length = 3; //TODO 最初の問題
//   let question_number = 1;
//   let question_limit = 3;
//   let done_questions = {};
//   let typing_cnt = 0;
//   let correct_cnt = 0;
//   let mistake_cnt = 0;
//   let start_game = false;
//   let start_time = 0;

//   // 問題
//   const MONDAI_LIST = [
//     {yomi:'あいうえお', text:'aiueo'},
//     {yomi:'あいうえお', text:'aiueo'},
//     {yomi:'かきくけこ', text:'kakikukeko'},
//     {yomi:'さしすせそ', text:'sasisuseso'},
//     {yomi:'たちつてと', text:'tatituteto'},
//     {yomi:'なにぬねの', text:'naninuneno'},
//     {yomi:'はひふへほ', text:'hahihuheho'},
//     {yomi:'まみむめも', text:'mamimumemo'},
//     {yomi:'やゆよ', text:'yayuyo'},
//     {yomi:'らりるれろ', text:'rarirurero'},
//     {yomi:'わをん', text:'wawonn'},
//   ];

//   $yomi.hide();
//   $mondai.hide();
//   changeQuestionWord(getQuestionNumber());

//   $countSelect.on('change', function(e) {
//     question_limit = Number($countSelect.val());
//     done_questions = {};
//     changeQuestionWord(getQuestionNumber());
//   });

//   $('#start-button').on('click', function(e) {
//     init();
//   });

//   $(document).on('keypress', function(e){
//     if (!start_game && e.keyCode === 32) {
//       $startMessage.hide();
//       $countSelect.hide();
//       $yomi.show();
//       $mondai.show();
//       start_game = true;
//       start_time = performance.now();
//       return;
//     } else if (!start_game) {
//       return;
//     }

//     typing_cnt++;

//     const $target = $('#char-'+char_index);
//     const char = $target.text();
//     if (e.key === char) { //入力文字と現在の位置の文字が一緒だったら
//       $target.removeClass('default');
//       $target.addClass('correct');
//       char_index++;
//       correct_cnt++; //正解カウント
//     } else {
//       mistake_cnt++; //間違いカウント
//     }

//     if (max_length < char_index) {
//       question_number++;
//       if (question_limit < question_number) {
//         finish();
//         return;
//       }
//       changeQuestionWord(getQuestionNumber());
//       char_index = 1; //初期化
//     }

//   });

//   function getQuestionNumber() {
//     let random_number = Math.floor(Math.random() * 10);
//     while (done_questions[random_number] !== undefined) {
//       random_number = Math.floor(Math.random() * 10);
//     }
//     done_questions[random_number] = random_number;
//     return random_number;
//   }

//   function init() { //初期化
//     char_index = 1;
//     question_number = 1;
//     question_limit = 3;
//     done_questions = {};
//     typing_cnt = 0;
//     correct_cnt = 0;
//     mistake_cnt = 0;
//     start_game = false;
//     start_time = 0;
//     $countSelect.val('0');

//     changeQuestionWord(getQuestionNumber());

//     $finishPanel.addClass('hidden');
//     $yomi.hide();
//     $mondai.hide();
//     $startMessage.show();
//     $countSelect.show();
//   }

//   function finish() {
//     $finishPanel.removeClass('hidden');
//     $yomi.hide();
//     $mondai.hide();
//     $correctMessage.text('正解数：'+correct_cnt+'/'+typing_cnt+'  ('+ Math.floor(correct_cnt/typing_cnt * 100)+'%)');
//     $mistakeMessage.text('間違い数：'+mistake_cnt+'/'+typing_cnt+'  ('+ Math.floor(mistake_cnt/typing_cnt * 100)+'%)');
//     const end_time = performance.now();
//     const typing_time = ( (end_time - start_time) / 1000).toFixed(2);
//     $timeMessage.text('かかった時間：'+typing_time+'秒');
//   }

//   function changeQuestionWord(index) {
//     const word = MONDAI_LIST[index]['text'];
//     max_length = word.length;
//     let newHtml = '';
//     for (var i = 0; i < max_length; i++) {
//       newHtml += '<p id="char-'+(i+1)+'" class="text default">'+word[i]+'</p>';
//     }
//     $mondai.html(newHtml);
//     $yomi.text(MONDAI_LIST[index]['yomi']);
//   }

// });