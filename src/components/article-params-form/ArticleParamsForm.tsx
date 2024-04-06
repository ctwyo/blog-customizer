import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Select } from '../select';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';
import clsx from 'clsx';
import { useClose } from '../hooks/useClose';

type UpdateCallBack = {
	onUpdate: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onUpdate }: UpdateCallBack) => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const [sidebarOpen, setSideBarOpen] = useState(false);
	const sidebarRef = useRef<HTMLElement>(null); // <aside>

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onUpdate(articleState);
		toggleSideBar();
	};

	useClose({
		isOpen: sidebarOpen,
		onClose: () => setSideBarOpen(false),
		rootRef: sidebarRef,
	});

	const toggleSideBar = () => {
		setSideBarOpen(!sidebarOpen);
	};

	const handleClear = () => {
		setArticleState(defaultArticleState);
	};

	const setArticleStateOption =
		(key: keyof ArticleStateType) => (value: OptionType) => {
			setArticleState((prevState) => ({ ...prevState, [key]: value }));
		};

	return (
		<>
			<ArrowButton toggleButton={toggleSideBar} isOpen={sidebarOpen} />
			<aside
				ref={sidebarRef}
				className={clsx(
					styles.container,
					sidebarOpen && styles.container_open
				)}>
				<form className={styles.form} onSubmit={handleApply}>
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
							selected={articleState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={setArticleStateOption('fontFamilyOption')}
						/>

						<RadioGroup
							name='font-size'
							options={fontSizeOptions}
							selected={articleState.fontSizeOption}
							title='размер шрифта'
							onChange={setArticleStateOption('fontSizeOption')}
						/>

						<Select
							title='цвет шрифта'
							selected={articleState.fontColor}
							options={fontColors}
							onChange={setArticleStateOption('fontColor')}
						/>

						<Select
							title='цвет фона'
							selected={articleState.backgroundColor}
							options={backgroundColors}
							onChange={setArticleStateOption('backgroundColor')}
						/>

						<Select
							title='Ширина контента'
							selected={articleState.contentWidth}
							options={contentWidthArr}
							onChange={setArticleStateOption('contentWidth')}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleClear} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
