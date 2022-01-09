<template>

<div style="background-color: rgb(153,50,204); height:820px;">
<navbar></navbar>

    <div class="text-center" style="margin-top:90px;" v-if="showscore">
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
                <div :style="player_progress2" class="healthbar text-center" style="background-color: rgb(153,50,204); margin: 0; color: white;">
                    {{score*20}} %
                </div>
        </div>
        <br>
        <hr>
        <div class="row">
          <div class="col-6">
          <h4>Kimliğiniz</h4>
          <hr>
          <p>
            Adınız : {{name}} <br>
            Doğum Yeri : {{place}} <br>
            Doğum Tarihi : {{date}}/{{mouth}}/{{year}} <br>
            Cinsiyet : {{gender}} <br>
          </p>
        </div>
        <div class="col-6">
          <h4>Cevaplar</h4>
          <hr>
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
        <h3 class="title">YAZILIM ANKETİ</h3>
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
        <p class="card-text">Yazılım anketi için butona tıklayınız.</p>
        <button style="background-color:rgb(153,50,204);" class="btn  btn-lg text-light" @click="startQuizFunc()">Sorulara Başla</button>
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
          <button style="background-color:rgb(153,50,204);" class="btn btn-block text-light" :key="index" v-for="(option, index) in questions[counter].answerOptions" @click="handleAnswerClick(option.isCorrect)" >{{option.answerText}}</button>
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
			questionText: 'En iyi back-end dili hangisidir?',
			answerOptions: [
				{ answerText: 'Phthon(Django)', isCorrect: false },
        { answerText: 'C#(Asp.net)', isCorrect: true },
				{ answerText: 'PHP(Laravel)', isCorrect: false },
				{ answerText: 'JavaScript(Node.js)', isCorrect: false },
			],
		},
		{
			questionText: 'En iyi Javascript frameworkü hangisidir?',
			answerOptions: [
				{ answerText: 'React', isCorrect: false },
				{ answerText: 'Angular', isCorrect: false },
				{ answerText: 'Vue.js', isCorrect: true },
				{ answerText: 'Nuxt.js', isCorrect: false },
			],
		},
		{
			questionText: 'Javada mobil yazılımlarda ne kullanılır?',
			answerOptions: [
				{ answerText: 'Kotlin', isCorrect: true },
				{ answerText: 'React-native', isCorrect: false },
        { answerText: 'Flutter', isCorrect: false },
        { answerText: 'Xamarin', isCorrect: false },
			],
		},
		{
			questionText: 'Yazılım öğrenilirken en önemlisi nedir?',
			answerOptions: [
				{ answerText: 'Ben biliyorum demek', isCorrect: false },
				{ answerText: 'Video izlemek', isCorrect: false },
				{ answerText: 'Kitap okumak', isCorrect: false },
				{ answerText: 'İstikrar', isCorrect: true },
			],
        },
        	{
			questionText: 'C# dili hangisiyle benzerdir?',
			answerOptions: [
				{ answerText: 'Javascript', isCorrect: false },
				{ answerText: 'Java', isCorrect: false },
				{ answerText: 'Python', isCorrect: false },
				{ answerText: 'GO', isCorrect: true },
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
