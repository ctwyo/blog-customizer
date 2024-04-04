import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from '../select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';

type UpdateCallback = (newState: ArticleStateType) => void;

export const ArticleParamsForm = ({
	onUpdate,
}: {
	onUpdate: UpdateCallback;
}) => {
	const [fontFamily, setFontFamily] = useState(fontFamilyOptions[0]);
	const [fontSize, setFontSize] = useState(fontSizeOptions[0]);
	const [fontColor, setFontColor] = useState(fontColors[0]);
	const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
	const [contentWidth, setContentWidth] = useState(contentWidthArr[0]);

	const handleApply = (e: React.MouseEvent) => {
		e.preventDefault();
		onUpdate({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
		toggleSideBar();
	};

	const [sidebarOpen, setSideBarOpen] = useState(false);
	const sidebarRef = useRef<HTMLBaseElement>(null); // <aside>

	const toggleSideBar = () => {
		if (sidebarRef.current) {
			sidebarRef.current.classList.toggle(styles.container_open);
			setSideBarOpen(!sidebarOpen);
		}
	};

	useEffect(() => {
		const handleClickOutsideSidebar = (event: MouseEvent) => {
			if (
				sidebarOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				toggleSideBar();
			}
		};
		//mousedown
		document.addEventListener('mousedown', handleClickOutsideSidebar);

		return () => {
			document.removeEventListener('mousedown', handleClickOutsideSidebar);
		};
	}, [sidebarOpen]);

	const handleClear = () => {
		setFontFamily(fontFamilyOptions[0]);
		setFontSize(fontSizeOptions[0]);
		setFontColor(fontColors[0]);
		setBackgroundColor(backgroundColors[0]);
		setContentWidth(contentWidthArr[0]);
	};

	return (
		<>
			<ArrowButton onClick={toggleSideBar} />
			<>
				<aside ref={sidebarRef} className={styles.container}>
					<form className={styles.form}>
						<div className={styles.topContainer}>
							<Text
								size={31}
								uppercase={true}
								weight={800}
								align='left'
								as={'h2'}>
								{'Задайте параметры'}
							</Text>

							<Select
								title='шрифт'
								selected={fontFamily}
								options={fontFamilyOptions}
								onChange={setFontFamily}
							/>

							<RadioGroup
								name='font-size'
								options={fontSizeOptions}
								selected={fontSize}
								title='размер шрифта'
								onChange={setFontSize}
							/>

							<Select
								title='цвет шрифта'
								selected={fontColor}
								options={fontColors}
								onChange={setFontColor}
							/>

							<Select
								title='цвет фона'
								selected={backgroundColor}
								options={backgroundColors}
								onChange={setBackgroundColor}
							/>

							<Select
								title='Ширина контента'
								selected={contentWidth}
								options={contentWidthArr}
								onChange={setContentWidth}
							/>
						</div>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' onClick={handleClear} />
							<Button title='Применить' type='submit' onClick={handleApply} />
						</div>
					</form>
				</aside>
			</>
		</>
	);
};
