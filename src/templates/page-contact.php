<?php

  if (!count($options['pageStack'])) $session->redirect($home->url . "#" . $page->name);

?>

<h2 class="tac mb2 mt1"><?=$page->title?></h2>
<div class="tac mb2"><?=$page->body?></div>

<?php

	$form = $modules->get("InputfieldForm");
	$form->action = "{$page->url}";
	$form->id = $page->name;
	setupFormMarkup($form);

	$formInput = $modules->get("InputfieldText");
  $formInput->name = "nimi";
  $formInput->label = "Nimi:";
  $formInput->required = true;
  $form->add($formInput);

  $formInput = $modules->get("InputfieldEmail");
  $formInput->name = "email";
  $formInput->label = "Sähköposti:";
  $formInput->required = true;
  $form->add($formInput);

  $formInput = $modules->get("InputfieldText");
  $formInput->name = "phone";
  $formInput->label = "Puhelinnumero:";
  $form->add($formInput);

  $formInput = $modules->get("InputfieldTextarea");
  $formInput->name = "message";
  $formInput->label = "Viestisi:";
  $formInput->required = true;
  $form->add($formInput);

	$form->add([
		"type" => "submit",
		"name" => "submit",
		"value" => __("Lähetä"),
		"class" => "button button--large button--center mt1"
	]);

	// If the form was submitted
	if ($input->post->submit) {
		// Make sure the required fields are filled and sanitized
		$form->processInput($input->post);

		// If there are no errors
		if (!$form->getErrors()) {
			// Success
			// Build subject
			$subject = "Uusi yhteydenotto";

			// Build message from template file
			$message = file_get_contents("{$config->paths->templates}email-contact.txt");
			$message = str_replace("{name}", $form->nimi->value, $message);
			$message = str_replace("{email}", $form->email->value, $message);
			$message = str_replace("{phone}", $form->phone->value->title, $message);
			$message = str_replace("{message}", $form->message->value, $message);

			$mail = wireMail();
			$mail->to("{$home->email}")->ToName("{$home->title}");
			$mail->from("{$form->email->value}")->fromName("{$form->title->value}");
			$mail->subject($subject);
			$mail->body($message);
			$mail->send();

			// Prevent duplicate submissions
			$session->CSRF->resetToken();

			// Redirect to thank you page
			$session->redirect($pages->get(1025)->httpUrl);
		} else {
			// Error
			$form->description = __("Korjaathan korostetut kentät.");
		}
	}

?>

<div class="grid grid--gutter mb2">
  <?=$form->render()?>
</div>
