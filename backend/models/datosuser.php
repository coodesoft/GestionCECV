<?php

namespace app\models;
use common\models\prestamos;
use common\models\Validacion;
use Yii;

/**
 * This is the model class for table "DatosUser".
 *
 * @property integer $IdUser
 * @property string $NombreyApellido
 * @property string $DNI
 * @property string $Email
 * @property string $Telefono
 *
 * @property Prestamos[] $prestamos
 */
class datosuser extends Validacion
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'DatosUser';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
           // [['NombreyApellido', 'DNI', 'Email', 'Telefono'], 'required'],
            [['NombreyApellido'], 'string', 'max' => 50],
            [['DNI'], 'string', 'max' => 12],
            [['Telefono'], 'string', 'max' => 20],
            [['Email'], 'email'],
            //['Suspendido','string','max'=>1]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'IdUser' => 'Id User',
            'NombreyApellido' => 'Nombre y Apellido',
            'DNI' => 'Dni',
            'Email' => 'Email',
            'Telefono' => 'Telefono',
            'Suspendido'=>'Suspendido',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPrestamos()
    {
        return $this->hasMany(prestamos::className(), ['idUser' => 'IdUser']);
    }
}
