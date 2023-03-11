import { Col, Row } from 'antd'
import { FC } from 'react'

interface IInfoItem {
	name: string
	value?: string
}

const InfoItem: FC<IInfoItem> = ({ name, value }) => {
	return (
		<Row style={{ textAlign: 'left', marginBottom: 10 }}>
			<Col span={7}>
				<b>{name}</b>
			</Col>
			<Col span={7}>{value || ''}</Col>
		</Row>
	)
}

export default InfoItem
