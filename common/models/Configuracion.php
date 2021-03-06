<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "configuracion".
 *
 * @property string $cod
 * @property string $valor
 * @property string $descripcion
 * @property string $control
 * @property string $etiqueta
 */
class Configuracion extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'configuracion';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            //[['cod', 'valor', 'descripcion', 'control', 'unidad'], 'required'],
            [['cod', 'unidad'], 'string', 'max' => 25],
            [['valor'], 'string', 'max' => 255],
            [['descripcion'], 'string', 'max' => 250],
            [['control'], 'string', 'max' => 5]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'cod' => 'Cod',
            'valor' => 'Valor',
            'descripcion' => 'Descripcion',
            'control' => 'Control',
            'unidad' => 'Unidad',
        ];
    }
}
