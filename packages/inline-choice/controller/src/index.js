export function outcome(question, session) {

  return new Promise((resolve) => {
    resolve({});
  });

}

export function model(model, session, env) {

  return new Promise((resolve) => {
    var response = {}
    if(env.mode === "evaluate") {
      response.result = evaluateAnswer(model, session);
    }

    response.choices = model.choices;
    response.disabled = env.mode !== 'gather';
    response.mode = env.mode;

    resolve(response);
  });

}

export function evaluateAnswer(model, session) {

  let filterd_choice = model.choices.filter( choice  => { return session.selectedChoice === choice.value });

  return (filterd_choice[0].correct != undefined) ? filterd_choice[0].correct : false;
}