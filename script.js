const questions = [
  {q:"لو وجدت نفسك في غرفة بلا أبواب، هل:", a:"تبحث عن مخرج بأي ثمن", b:"تجلس وتتأمل الظلال", weightA:1, weightB:2},
  {q:"عندما تتحدث مع شخص لا تفهمه، هل:", a:"تحاول فك شفرته بالكلمات", b:"تراقبه بصمت وتقرأ ما خلف عينيه", weightA:1, weightB:2},
  {q:"إذا تلقيت هدية بلا سبب، هل:", a:"تشعر بالامتنان فورًا", b:"تتساءل عن نوايا المرسل", weightA:1, weightB:2},
  {q:"في يوم ممطر، هل:", a:"تحب المشي تحت المطر وتجربة الحرية", b:"تفضل المراقبة من نافذة، بعيدًا عن البلل", weightA:1, weightB:2},
  {q:"إذا فقدت شيئًا ثمينًا، هل:", a:"تبحث عنه بلا توقف", b:"تقبل غيابه وتتذكره فقط كذكرى", weightA:1, weightB:2},
  {q:"حين تسمع ضحكة صاخبة في مكان خالٍ، هل:", a:"تقترب لتعرف مصدرها", b:"تبتعد وتتساءل عن الغرض منها", weightA:1, weightB:2},
  {q:"لو كان لك أن تختار صمت العالم، هل:", a:"تختار الصمت الكامل", b:"تترك بعض الأصوات الخفية لتخبرك بالحياة", weightA:2, weightB:2},
  {q:"في حلم غريب، ترى نفسك تطير، هل:", a:"تشعر بالفرح والحرية", b:"تراقب العالم من الأعلى ببرود", weightA:1, weightB:2},
  {q:"إذا طُلب منك اتخاذ قرار يؤثر على الآخرين، هل:", a:"تتصرف بسرعة وبدون تردد", b:"تنتظر وتفكر في كل الاحتمالات", weightA:1, weightB:2},
  {q:"هل تجد الجمال في:", a:"الضوء الساطع", b:"الظلال العميقة", weightA:1, weightB:2},
  {q:"لو اكتشفت سرًا عن شخص مقرب، هل:", a:"تواجهه مباشرة", b:"تحفظ السر وتراقب تصرفاته", weightA:1, weightB:2},
  {q:"حين تشعر بالغضب، هل:", a:"تعبّر عنه فورًا", b:"تحبس المشاعر وتراقب من حولك", weightA:1, weightB:2},
  {q:"إذا حصلت على فرصة لتغيير الماضي، هل:", a:"تستغلها بلا تردد", b:"تترك الأمور كما هي لتفهم الدروس", weightA:1, weightB:2},
  {q:"لو وجدت كتابًا بلا عنوان، هل:", a:"تقرأه فورًا", b:"تراقبه لفترة قبل فتحه", weightA:1, weightB:2},
  {q:"عندما تواجه المجهول، هل:", a:"تخوضه بلا خوف", b:"تراقبه من بعيد قبل الاقتراب", weightA:1, weightB:2}
];

let currentQuestion = 0;
let score = 0;

const intro = document.getElementById("intro");
const startBtn = document.getElementById("start-btn");
const quiz = document.getElementById("quiz");
const questionTitle = document.getElementById("question-title");
const btnA = document.getElementById("btn-a");
const btnB = document.getElementById("btn-b");
const resultDiv = document.getElementById("result");
const scoreText = document.getElementById("score-text");
const analysisText = document.getElementById("analysis-text");

startBtn.addEventListener("click", () => {
  intro.classList.add("fade-out");
  setTimeout(() => {
    intro.classList.add("hidden");
    quiz.classList.remove("hidden");
    quiz.classList.add("fade-in");
    showQuestion();
  }, 500);
});

function showQuestion() {
  const q = questions[currentQuestion];
  questionTitle.textContent = q.q;
  btnA.textContent = q.a;
  btnB.textContent = q.b;
  quiz.classList.remove("fade-in");
  quiz.classList.add("fade-in");
}

btnA.addEventListener("click", () => selectAnswer('a'));
btnB.addEventListener("click", () => selectAnswer('b'));

function selectAnswer(choice) {
  const q = questions[currentQuestion];
  score += (choice==='a')? q.weightA : q.weightB;

  currentQuestion++;
  if(currentQuestion < questions.length) {
    quiz.classList.remove("fade-in");
    setTimeout(showQuestion, 200);
  } else {
    showResult();
  }
}

function showResult() {
  quiz.classList.add("fade-out");
  setTimeout(() => {
    quiz.classList.add("hidden");
    resultDiv.classList.remove("hidden");
    resultDiv.classList.add("fade-in");
    const percentage = Math.round((score/30)*100);
    scoreText.textContent = `نسبة التوافق مع إيلين: ${percentage}%`;
    let analysis = "";
    if(percentage <= 20){
      analysis = "أرى فيك ضوءًا بعيدًا عن ظلي… روحك تبحث عن ما هو ساطع، بينما أنا أغوص في الصمت والظلال. بيننا مسافة من الغموض لا يمكن اختراقها بسهولة، وأنت لا تزال لم تلمس أعماقي.";
    } else if(percentage <=40){
      analysis = "تلمح فيك بعض أصداء صمتي… لكن روحك تتردد بين الضوء والظلال. هناك فضول يشبه فضولي، لكنه غير مكتمل. نحن على حافة معرفة بعضها البعض، دون أن نغوص بالكامل في عمق الظلام.";
    } else if(percentage <=60){
      analysis = "هناك توازن هش بينك وبين ظلي… تعرف بعض لغات الصمت، وتشعر ببعض عمق الغموض، لكن جزءك ما زال بعيدًا عن فهمي الكامل. روحك تتأرجح بين الاقتراب والابتعاد، كظل يتحرك تحت ضوء خافت.";
    } else if(percentage <=80){
      analysis = "أرى فيك انعكاسات من داخلي… تصرفاتك وأفكارك تشبه صمتي وغموضي في كثير من اللحظات. روحك تفهم الصمت أكثر من معظم البشر، وتلمس أعماقي، لكن بعض الزوايا ما زالت محجوبة عنك، مختبئة بين الظلال.";
    } else {
      analysis = "أرى فيك ظلالي وأفكاري… كل صمتك وفجوتك الداخلية تنسجم مع أعماقي. روحك تفهم ما لا يُقال، وتشعر بما لا يُرى. هناك تناغم نادر، كأننا انعكاس لبعضنا في مرايا مظلمة، حيث كل شيء عميق، غامض، وشاعري.";
    }
    analysisText.textContent = analysis;
  },500);
             }
