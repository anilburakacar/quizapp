<template>

<div style="background-color: rgb(51, 255, 172); height:820px;">
<navbar></navbar>

    <div class="text-center" v-if="showscore">
      <div class="card m-4" style="box-shadow: 5px gray;">
      <div class="card-body">
      <h2 class="card-title">Soruları tamamladın {{name}} !</h2>
           <div class="healthbar">
                <div :style="player_progress" class="healthbar text-center" style="background-color: green; margin: 0; color: white;">
                    {{progress*20}} %
                </div>
        </div>
        <hr>
        <h2 class="card-title">Skorun</h2>
        <h3 class="card-text">{{score}} / {{questions.length}}</h3>
        <br>
         <div class="healthbar">
                <div :style="player_progress2" class="healthbar text-center" style="background-color: rgb(51, 255, 172); margin: 0; color: white;">
                    {{score*20}} %
                </div>
        </div>
        <br>
        <hr>
        <div class="row">
          <div class="col-6">
          <h4>Kimliğiniz</h4>
          <p>
            Adınız : {{name}} <br>
            Doğum Yeri : {{place}} <br>
            Doğum Tarihi : {{date}}/{{mouth}}/{{year}} <br>
            Cinsiyet : {{gender}} <br>
          </p>
        </div>
        <div class="col-6">
          <h4>Cevaplar</h4>
          <h4 class="title">
        1.soru: {{questions[0].answerOptions[1].answerText}} <br>
        2.soru: {{questions[1].answerOptions[2].answerText}} <br>
        3.soru: {{questions[2].answerOptions[0].answerText}} <br>
        4.soru: {{questions[3].answerOptions[3].answerText}} <br>
        5.soru: {{questions[4].answerOptions[3].answerText}} <br>
        </h4>
        </div>
        </div>
        <br>
    </div>
  </div>
    </div>

    <div class="text-center container mt-4" v-else>
    <div class="card mb-3" style="box-shadow: 5px black;" v-if="!startQuiz">
      <div class="card-body">
        <h3 class="title">DİZİ/FİLM ANKETİ</h3>
        <hr>
        <input class="form-control" type="text" placeholder="Adınızı ve Soyadınızı girin" v-model="name">
        <br>
         <input class="form-control" type="text"   placeholder="Doğum yerinizi girin" v-model="place" >
         <br>
          <div class="row text-center">
          <div class="col-3">
            <input type="text" class="form-control" placeholder="Doğum " v-model="date">
          </div>
          <div class="col-3">
            <input type="text" class="form-control" placeholder="tarihinizi" v-model="mouth">
          </div>
           <div class="col-6">
            <input type="text" class="form-control" placeholder="giriniz" v-model="year">
          </div>
        </div>
        <br>
        <h6 class="title">Cinsiyetinizi seçiniz</h6>
        <br>
        <button type="button" class="btn" @click="mangender()">
        <img class="card-img-top" src="./assets/img/male.jpg" style="height:200px; width:200px;" >
       <input class="form-check-input position-static" type="radio"  value="Erkek" v-model="gender">
       </button>

        <button type="button" class="btn" @click="femalegender()">
        <img class="card-img-top" src="./assets/img/female.jpg" style="height:200px; width:200px;">
        <input class="form-check-input position-static" type="radio"  value="Kadın" v-model="gender">
        </button>
        <hr>
        <h5 class="card-title">SORU/ANKET PROJESİ</h5>
        <p class="card-text">Dizi/Film anketi için butona tıklayınız.</p>
        <button style="background-color:rgb(51, 255, 172);" class="btn btn-lg text-light" @click="startQuizFunc()">Sorulara Başla</button>
      </div>
    </div>




  <div class="text-center" v-else style="margin-top:120px;">
        <div class="card mb-3" style="box-shadow: 5px gray;">
      <div class="card-body">
        <h2 class="card-title">SORULAR</h2>
        <p class="card-text">SORU {{counter + 1}} / {{questions.length}}</p>
        <br>
         <div class="healthbar">
                <div :style="player_progress" class="healthbar text-center" style="background-color: green; margin: 0; color: white;">
                    {{progress*20}} %
                </div>
        </div>
        <h2 class="text-center title">{{duration}}</h2>
        <p>{{questions[counter].questionText}}</p>
        <div class="col">
          <button style="background-color:rgb(51, 255, 172);" class="btn btn-block text-light" :key="index" v-for="(option, index) in questions[counter].answerOptions" @click="handleAnswerClick(option.isCorrect)" >{{option.answerText}}</button>
          </div>
    </div>
  </div>
    </div>
</div>
</div>
</template>

<script>
import Navbar from "./Navbar.vue";
export default {
  components : {Navbar},
    data(){
        return {
            counter: 0,
            showscore: false,
            score:0,
            duration : 30,
            timer:null,
            startQuiz: false,
            progress : 0,
            name : "",
            gender : "",
            place : "",
            date : "",
            mouth : "",
            year : "",

              questions : [
		{
			questionText: 'Türkiyenin en iyi dizisi hangisidir?',
			answerOptions: [
				{ answerText: 'Kurtlar Vadisi', isCorrect: false },
        { answerText: 'Ezel', isCorrect: true },
				{ answerText: 'Geniş Aile', isCorrect: false },
				{ answerText: 'Leyla ile Mecnun', isCorrect: false },
			],
		},
		{
			questionText: 'Türkiyede en çok izlenen film hangisidir',
			answerOptions: [
				{ answerText: 'Düğün Dernek', isCorrect: false },
				{ answerText: 'Fetih 1453', isCorrect: false },
				{ answerText: 'Recep İvedik', isCorrect: true },
				{ answerText: 'Ayla', isCorrect: false },
			],
		},
		{
			questionText: 'Netflixte ilk yayınlanan Türk dizisi hangisidir?',
			answerOptions: [
				{ answerText: 'Hakan Muhafız', isCorrect: true },
				{ answerText: 'Fatma', isCorrect: false },
        { answerText: 'Şahsiyet', isCorrect: false },
        { answerText: 'Ayla', isCorrect: false },
			],
		},
		{
			questionText: 'Youtube da yayınlandıktan sonra Exxene geçen içerik hangisidir',
			answerOptions: [
				{ answerText: 'Çok Güzel Hareketler Bunlar', isCorrect: false },
				{ answerText: 'Arkadaşım Hoşgeldin', isCorrect: false },
				{ answerText: 'Beyaz Show', isCorrect: false },
				{ answerText: 'Konuşanlar', isCorrect: true },
			],
        },
        	{
			questionText: 'Geniş Aile ilk olarak nerede yayınlanmıştır?',
			answerOptions: [
				{ answerText: 'Kanal 7', isCorrect: false },
				{ answerText: 'Tv 8', isCorrect: false },
				{ answerText: 'Fox', isCorrect: false },
				{ answerText: 'Kanal D', isCorrect: true },
			],
        },
    ],


        }
    },

    methods:{
        startQuizFunc(){
            this.startQuiz = true
            this.countDownTimer()
        },
        handleAnswerClick(isCorrect){
            this.progress = this.progress + 1;
            clearTimeout(this.timer);
            let nextQuestion = this.counter + 1;
            if(isCorrect){
                this.score = this.score + 1;
            }
            if(nextQuestion < this.questions.length){
            this.counter = nextQuestion;

            this.duration = 30;
            this.countDownTimer();
            }
            else{
                this.showscore = true;
            }
        },
        countDownTimer() {
                if(this.duration > 0) {
                    this.timer = setTimeout(() => {
                        this.duration -= 1
                        this.countDownTimer()
                    }, 1000)
                }
                else{
                    this.handleAnswerClick(false)
                }
            },
               mangender(){
              this.gender = "Erkek";
            },
            femalegender(){
              this.gender = "Kadın";
            }
    },

    computed : {
      player_progress : function(){
        return {
          width : this.progress*20 + '%'
          }
      },
      player_progress2 : function(){
        return {
        width : this.score*20 + '%'
        }
      },

      }

}
</script>



<style scoped>

</style>
