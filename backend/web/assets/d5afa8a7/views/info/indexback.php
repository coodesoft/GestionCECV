<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\modules\gestiondatos\models\datosuserb */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Estudiantes, Información de contacto';
?>
<div class="datosuser-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a('Agregar nuevo', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'IdUser',
            'NombreyApellido',
            'DNI',
            'Email:email',
            'Telefono',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>

</div>