<?php

namespace App\Presenters;

use Nette;


final class HomepagePresenter extends Nette\Application\UI\Presenter
{

	public function renderDefault(): void
	{
		$this->template->randomValue = Nette\Utils\Random::generate();

	}


	public function handleGenerate(): void
	{
		$this->template->randomValue = Nette\Utils\Random::generate();
		$this->redrawControl('random');
	}

}
