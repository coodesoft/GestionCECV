<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\modules\gestionstock\models\stock */

$this->title = 'Update Stock: ' . ' ' . $model->idStock;
$this->params['breadcrumbs'][] = ['label' => 'Stocks', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->idStock, 'url' => ['view', 'id' => $model->idStock]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="stock-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
