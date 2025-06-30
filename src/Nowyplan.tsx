import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const colourOptions = [
	{
		name: "Domyślny",
		bg: "#ffe0ec",
		border: "#a7c7e7",
		text: "#4b3f72",
		accent: "#f7b267",
		sidebar: "#fff8f0",
	},
	{
		name: "Niebieski",
		bg: "#a7c7e7",
		border: "#4b3f72",
		text: "#22223b",
		accent: "#4b3f72",
		sidebar: "#e0ecff",
	},
	{
		name: "Ciemny",
		bg: "#232946",
		border: "#121629",
		text: "#eebbc3",
		accent: "#eebbc3",
		sidebar: "#121629",
	},
	{
		name: "Miętowy",
		bg: "#e0fff7",
		border: "#38b6ff",
		text: "#1b4965",
		accent: "#38b6ff",
		sidebar: "#b8fff9",
	},
	{
		name: "Zielony",
		bg: "#eafbea",
		border: "#38b000",
		text: "#004b23",
		accent: "#38b000",
		sidebar: "#d8f3dc",
	},
	{
		name: "Pomarańczowy",
		bg: "#fff4e6",
		border: "#ff8800",
		text: "#7c4700",
		accent: "#ff8800",
		sidebar: "#ffe5b4",
	},
	{
		name: "Fioletowy",
		bg: "#f3e8ff",
		border: "#a259f7",
		text: "#3d246c",
		accent: "#a259f7",
		sidebar: "#e0c3fc",
	},
	{
		name: "Różowy",
		bg: "#ffe0f7",
		border: "#ff5eae",
		text: "#a4133c",
		accent: "#ff5eae",
		sidebar: "#ffd6ec",
	},
];

const fontOptions = [
	{ name: "Domyślna", value: "inherit" },
	{ name: "Monospace", value: "monospace" },
	{ name: "Serif", value: "serif" },
	{ name: "Sans-serif", value: "sans-serif" },
	{ name: "Cursive", value: "cursive" },
	{ name: "Fantasy", value: "fantasy" },
	{ name: "Quicksand", value: "'Quicksand', sans-serif" },
	{ name: "Pacifico", value: "'Pacifico', cursive" },
	{ name: "Lobster", value: "'Lobster', cursive" },
	{ name: "Dancing Script", value: "'Dancing Script', cursive" },
	{ name: "Indie Flower", value: "'Indie Flower', cursive" },
];

const Nowyplan: React.FC = () => {
	const [columns, setColumns] = useState<string[]>([""]);
	const [columnTypes, setColumnTypes] = useState<string[]>(["text"]);
	const [rowTypes, setRowTypes] = useState<string[]>(["text"]);
	const [numRows, setNumRows] = useState(1);
	const [tableData, setTableData] = useState<(string | boolean)[][]>([[""]]);
	const [appearance, setAppearance] = useState(colourOptions[0]);
	const [font, setFont] = useState(fontOptions[0].value);
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [planName, setPlanName] = useState("");

	const navigate = useNavigate();

	const themeName = localStorage.getItem("theme") || "Domyślny";
	const mainTheme =
		colourOptions.find((t) => t.name === themeName) || colourOptions[0];

	const handleColumnNameChange = (colIdx: number, value: string) => {
		const newColumns = [...columns];
		newColumns[colIdx] = value;
		setColumns(newColumns);
	};

	const handleColumnTypeChange = (colIdx: number, value: string) => {
		const newTypes = [...columnTypes];
		newTypes[colIdx] = value;
		setColumnTypes(newTypes);
		if (value === "checkbox") {
			setTableData((prev) =>
				prev.map((row) => {
					const newRow = [...row];
					newRow[colIdx] = !!newRow[colIdx];
					return newRow;
				})
			);
		}
	};

	const handleRowTypeChange = (rowIdx: number, value: string) => {
		const newTypes = [...rowTypes];
		newTypes[rowIdx] = value;
		setRowTypes(newTypes);
		if (value === "checkbox") {
			setTableData((prev) =>
				prev.map((row, r) => {
					if (r === rowIdx) {
						return row.map(() => true);
					}
					return row;
				})
			);
		}
	};

	const handleAddColumn = () => {
		setColumns([...columns, ""]);
		setColumnTypes([...columnTypes, "text"]);
		setTableData(tableData.map((row) => [...row, ""]));
	};

	const handleRemoveColumn = (colIdx: number) => {
		if (columns.length === 1) return;
		setColumns(columns.filter((_, idx) => idx !== colIdx));
		setColumnTypes(columnTypes.filter((_, idx) => idx !== colIdx));
		setTableData(tableData.map((row) => row.filter((_, idx) => idx !== colIdx)));
	};

	const handleNumRowsChange = (value: number) => {
		if (value < 1) return;
		setNumRows(value);
		if (value > tableData.length) {
			setTableData([
				...tableData,
				...Array.from({ length: value - tableData.length }, () =>
					Array(columns.length).fill("")
				),
			]);
			setRowTypes([...rowTypes, ...Array(value - rowTypes.length).fill("text")]);
		} else if (value < tableData.length) {
			setTableData(tableData.slice(0, value));
			setRowTypes(rowTypes.slice(0, value));
		}
	};

	const handleAddRow = () => {
		setNumRows(numRows + 1);
		setTableData([...tableData, Array(columns.length).fill("")]);
		setRowTypes([...rowTypes, "text"]);
	};

	const handleAppearanceChange = (idx: number) => {
		setAppearance(colourOptions[idx]);
	};

	const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFont(e.target.value);
	};

	const handleSaveTable = () => {
		const savedTable = {
			name: planName,
			columns,
			columnTypes,
			rowTypes,
			tableData,
			appearance,
			font,
			date: new Date().toISOString(),
		};
		const existing = localStorage.getItem("savedTimetables");
		let tables = existing ? JSON.parse(existing) : [];
		if (tables.length >= 5) {
			tables = tables.slice(1);
		}
		tables.push(savedTable);
		localStorage.setItem("savedTimetables", JSON.stringify(tables));
		alert("Plan został zapisany!");
	};

	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				minHeight: "100vh",
				minWidth: "100vw",
				background: mainTheme.bg,
				padding: 0,
				display: "flex",
				flexDirection: "row",
				alignItems: "flex-start",
				overflow: "auto",
			}}
		>
			{sidebarOpen && (
				<div
					style={{
						position: "relative",
						width: 220,
						background: mainTheme.sidebar,
						borderRight: `1px solid ${mainTheme.border}`,
						minHeight: "100vh",
						boxShadow: "2px 0 8px rgba(75,63,114,0.03)",
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						padding: "2rem 1rem",
						zIndex: 2,
						transition:
							"transform 0.4s cubic-bezier(.4,0,.2,1), opacity 0.4s cubic-bezier(.4,0,.2,1)",
						transform: sidebarOpen ? "translateX(0)" : "translateX(-240px)",
						opacity: sidebarOpen ? 1 : 0,
						pointerEvents: sidebarOpen ? "auto" : "none",
					}}
				>
					{/* Top section */}
					<div
						style={{
							width: "100%",
							marginBottom: "2.5rem",
							textAlign: "center",
						}}
					>
						<img
							src="/image1.png"
							alt="Logo"
							style={{
								width: "54px",
								height: "54px",
								objectFit: "contain",
								marginBottom: "0.5rem",
								marginTop: "-1rem",
							}}
						/>
						<div
							style={{
								fontWeight: "bold",
								fontSize: "1.5rem",
								color: mainTheme.text,
								marginBottom: "0.2rem",
								letterSpacing: "1px",
							}}
						>
							Planer zadań
						</div>
						<div
							style={{
								fontSize: "0.95rem",
								color: mainTheme.text,
								fontStyle: "italic",
								opacity: 0.7,
							}}
						>
							created by Anna Korzeniewska 53522
						</div>
					</div>
					<button
						onClick={() => setSidebarOpen(false)}
						style={{
							position: "absolute",
							top: 10,
							right: -18,
							width: 28,
							height: 28,
							borderRadius: "50%",
							border: `1px solid ${mainTheme.accent}`,
							background: "#fff",
							color: mainTheme.text,
							cursor: "pointer",
							boxShadow: "0 2px 8px rgba(75,63,114,0.08)",
							zIndex: 3,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontWeight: "bold",
							fontSize: "1.1rem",
							transition: "right 0.2s",
						}}
						title="Ukryj panel"
					>
						←
					</button>
					<nav style={{ marginTop: "2.5rem", width: "100%" }}>
						<ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
							<li
								style={{
									marginBottom: "1.5rem",
									fontWeight: "bold",
									color: appearance.accent,
								}}
							>
								<button
									style={{
										background: "none",
										border: "none",
										color: appearance.accent,
										fontWeight: "bold",
										cursor: "pointer",
										fontSize: "1rem",
										padding: 0,
									}}
									onClick={() => navigate("/")}
								>
									Strona główna
								</button>
							</li>
							<li
								style={{
									marginBottom: "1.5rem",
									color: appearance.text,
								}}
							>
								<button
									style={{
										background: "none",
										border: "none",
										color: appearance.text,
										cursor: "pointer",
										fontSize: "1rem",
										padding: 0,
									}}
									onClick={() => navigate("/saved")}
								>
									Moje zadania
								</button>
							</li>
							<li
								style={{
									marginBottom: "1.5rem",
									color: "var(--text)",
								}}
							>
								<button
									style={{
										background: "none",
										border: "none",
										color: appearance.text,
										cursor: "pointer",
										fontSize: "1rem",
										padding: 0,
									}}
									onClick={() => navigate("/settings")}
								>
									Ustawienia
								</button>
							</li>
							<li
								style={{
									marginBottom: "1.5rem",
									color: appearance.accent,
									fontWeight: "bold",
								}}
							>
								<button
									style={{
										background: "none",
										border: "none",
										color: appearance.accent,
										fontWeight: "bold",
										cursor: "pointer",
										fontSize: "1rem",
										padding: 0,
									}}
									onClick={() => navigate("/nowyplan")}
								>
									Nowy plan
								</button>
							</li>
						</ul>
					</nav>
				</div>
			)}
			{!sidebarOpen && (
				<button
					onClick={() => setSidebarOpen(true)}
					style={{
						position: "fixed",
						top: 28,
						left: 0,
						width: 28,
						height: 28,
						borderRadius: "50%",
						border: `1px solid ${appearance.accent}`,
						background: "#fff",
						color: appearance.text,
						cursor: "pointer",
						boxShadow: "0 2px 8px rgba(75,63,114,0.08)",
						zIndex: 10,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontWeight: "bold",
						fontSize: "1.1rem",
						marginLeft: "4px",
					}}
					title="Pokaż panel"
				>
					→
				</button>
			)}
			<div
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<h2
					style={{
						color: "var(--text)",
						marginBottom: "0.5rem",
					}}
				>
					Stwórz nowy plan
				</h2>
				<div
					style={{
						width: "120px",
						height: "8px",
						marginBottom: "1.5rem",
						background: `linear-gradient(90deg, ${appearance.accent} 0%, ${appearance.text} 100%)`,
						borderRadius: "4px",
					}}
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1.2rem",
						alignItems: "flex-start",
						marginBottom: "2rem",
						flexWrap: "wrap",
						width: "100%",
						maxWidth: 900,
					}}
				>
					<div>
						<label
							style={{
								color: appearance.text,
								fontWeight: "bold",
								marginRight: "0.5rem",
							}}
						>
							Nazwa planu:
						</label>
						<input
							type="text"
							value={planName}
							onChange={(e) => setPlanName(e.target.value)}
							placeholder="Wpisz nazwę planu"
							style={{
								borderRadius: "0.5rem",
								border: `1px solid ${appearance.border}`,
								padding: "0.3rem 0.7rem",
								minWidth: "180px",
								fontFamily: font,
							}}
						/>
					</div>
					<div>
						<label
							style={{
								color: appearance.text,
								fontWeight: "bold",
								marginRight: "0.5rem",
							}}
						>
							Motyw:
						</label>
						{colourOptions.map((opt, idx) => (
							<button
								key={opt.name}
								type="button"
								onClick={() => handleAppearanceChange(idx)}
								style={{
									background: opt.bg,
									color: opt.text,
									border: `2px solid ${opt.border}`,
									borderRadius: "0.5rem",
									padding: "0.3rem 1rem",
									marginRight: "0.5rem",
									fontWeight: "bold",
									cursor: "pointer",
									outline:
										appearance.name === opt.name
											? `2px solid ${opt.accent}`
											: "none",
									boxShadow:
										appearance.name === opt.name
											? `0 0 0 2px ${opt.accent}`
											: "none",
								}}
							>
								{opt.name}
							</button>
						))}
					</div>
					<div>
						<label
							style={{
								color: appearance.text,
								fontWeight: "bold",
								marginRight: "0.5rem",
							}}
						>
							Czcionka:
						</label>
						<select
							value={font}
							onChange={handleFontChange}
							style={{
								fontFamily: font,
								borderRadius: "0.5rem",
								border: `1px solid ${appearance.border}`,
								padding: "0.3rem 0.7rem",
							}}
						>
							{fontOptions.map((opt) => (
								<option
									key={opt.value}
									value={opt.value}
									style={{ fontFamily: opt.value }}
								>
									{opt.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<span
							style={{
								color: appearance.text,
								fontWeight: "bold",
							}}
						>
							Kolumny:
						</span>
						<div
							style={{
								display: "flex",
								alignItems: "flex-end",
								gap: "0.5rem",
								flexWrap: "wrap",
							}}
						>
							{columns.map((col, idx) => (
								<div
									key={idx}
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									<input
										type="text"
										value={col}
										onChange={(e) =>
											handleColumnNameChange(idx, e.target.value)
										}
										placeholder={`Kolumna ${idx + 1}`}
										style={{
											borderRadius: "0.5rem",
											border: `1px solid ${appearance.border}`,
											padding: "0.3rem 0.7rem",
											minWidth: "80px",
											fontFamily: font,
											marginBottom: "0.3rem",
										}}
									/>
									<select
										value={columnTypes[idx]}
										onChange={(e) =>
											handleColumnTypeChange(idx, e.target.value)
										}
										style={{
											borderRadius: "0.5rem",
											border: `1px solid ${appearance.border}`,
											padding: "0.2rem 0.5rem",
											fontFamily: font,
											marginBottom: "0.2rem",
										}}
									>
										<option value="text">Tekst</option>
										<option value="checkbox">Checkbox</option>
										<option value="date">Data</option>
										<option value="time">Godzina</option>
									</select>
									{columns.length > 1 && (
										<button
											type="button"
											onClick={() => handleRemoveColumn(idx)}
											style={{
												background: "transparent",
												border: "none",
												color: appearance.accent,
												fontWeight: "bold",
												cursor: "pointer",
												fontSize: "1.2rem",
												marginTop: "0.2rem",
											}}
											title="Usuń kolumnę"
										>
											×
										</button>
									)}
								</div>
							))}
							<button
								type="button"
								onClick={handleAddColumn}
								style={{
									background: appearance.accent,
									color: "#fff",
									border: "none",
									borderRadius: "0.5rem",
									padding: "0.3rem 1rem",
									cursor: "pointer",
									fontWeight: "bold",
									alignSelf: "flex-start",
									marginLeft: "0.7rem",
									height: "fit-content",
								}}
							>
								Dodaj kolumnę
							</button>
						</div>
					</div>
					<div>
						<label
							style={{
								color: appearance.text,
								fontWeight: "bold",
							}}
						>
							Wiersze:
							<input
								type="number"
								min={1}
								value={numRows}
								onChange={(e) =>
									handleNumRowsChange(Number(e.target.value))
								}
								style={{
									marginLeft: "1rem",
									borderRadius: "0.5rem",
									border: `1px solid ${appearance.border}`,
									padding: "0.3rem 0.7rem",
									width: "60px",
									fontFamily: font,
								}}
							/>
						</label>
						<button
							type="button"
							onClick={handleAddRow}
							style={{
								marginLeft: "0.7rem",
								background: appearance.accent,
								color: "#fff",
								border: "none",
								borderRadius: "0.5rem",
								padding: "0.3rem 1rem",
								cursor: "pointer",
								fontWeight: "bold",
							}}
						>
							Dodaj wiersz
						</button>
					</div>
					<div>
						<span
							style={{
								color: appearance.text,
								fontWeight: "bold",
							}}
						>
							Typ wiersza:
						</span>
						{rowTypes.map((type, idx) => (
							<span key={idx} style={{ marginLeft: "0.5rem" }}>
								<select
									value={type}
									onChange={(e) => handleRowTypeChange(idx, e.target.value)}
									style={{
										borderRadius: "0.5rem",
										border: `1px solid ${appearance.border}`,
										padding: "0.2rem 0.5rem",
										fontFamily: font,
										marginBottom: "0.2rem",
									}}
								>
									<option value="text">Tekst</option>
									<option value="checkbox">Checkbox</option>
									<option value="date">Data</option>
									<option value="time">Godzina</option>
								</select>
							</span>
						))}
					</div>
				</div>
				<div
					style={{
						background: appearance.bg,
						borderRadius: "1rem",
						padding: "2rem",
						boxShadow: "0 2px 8px rgba(75,63,114,0.08)",
						maxWidth: "900px",
						width: "100%",
						overflowX: "auto",
						fontFamily: font,
					}}
				>
					<h3 style={{ color: appearance.text }}>Twój plan</h3>
					<table
						style={{
							width: "100%",
							borderCollapse: "separate",
							borderSpacing: "4px 6px",
							marginTop: "1rem",
							fontFamily: font,
						}}
					>
						<thead>
							<tr>
								{columns.map((col, idx) => (
									<th
										key={idx}
										style={{
											border: `1px solid ${appearance.border}`,
											padding: "0.5rem",
											background: appearance.bg,
											color: appearance.text,
											borderRadius: "0.4rem",
										}}
									>
										{col || `Kolumna ${idx + 1}`}
									</th>
								))}
								<th style={{ background: appearance.bg, border: "none" }}></th>
							</tr>
						</thead>
						<tbody>
							{tableData.map((row, rowIdx) => (
								<tr key={rowIdx}>
									{columns.map((_, colIdx) => (
										<td
											key={colIdx}
											style={{
												border: `1px solid ${appearance.border}`,
												padding: "0.5rem",
												background: "#fff",
												borderRadius: "0.4rem",
											}}
										>
											{columnTypes[colIdx] === "checkbox" ||
											rowTypes[rowIdx] === "checkbox" ? (
												<input
													type="checkbox"
													checked={!!row[colIdx]}
													onChange={(e) => {
														setTableData((prev) =>
															prev.map((r, rIdx) =>
																rIdx === rowIdx
																	? r.map((cell, cIdx) =>
																			cIdx === colIdx
																				? e.target.checked
																				: cell
																	  )
																	: r
															)
														);
													}}
													style={{
														width: "1.2em",
														height: "1.2em",
													}}
												/>
											) : columnTypes[colIdx] === "date" ||
											  rowTypes[rowIdx] === "date" ? (
												<input
													type="date"
													value={
														typeof row[colIdx] === "string"
															? row[colIdx]
															: ""
													}
													onChange={(e) => {
														setTableData((prev) =>
															prev.map((r, rIdx) =>
																rIdx === rowIdx
																	? r.map((cell, cIdx) =>
																			cIdx === colIdx
																				? e.target.value
																				: cell
																	  )
																	: r
															)
														);
													}}
													style={{
														width: "100%",
														border: "none",
														background: "transparent",
														color: appearance.text,
														outline: "none",
														fontFamily: font,
													}}
												/>
											) : columnTypes[colIdx] === "time" ||
											  rowTypes[rowIdx] === "time" ? (
												<input
													type="time"
													value={
														typeof row[colIdx] === "string"
															? row[colIdx]
															: ""
													}
													onChange={(e) => {
														setTableData((prev) =>
															prev.map((r, rIdx) =>
																rIdx === rowIdx
																	? r.map((cell, cIdx) =>
																			cIdx === colIdx
																				? e.target.value
																				: cell
																	  )
																	: r
															)
														);
													}}
													style={{
														width: "100%",
														border: "none",
														background: "transparent",
														color: appearance.text,
														outline: "none",
														fontFamily: font,
													}}
												/>
											) : (
												<input
													type="text"
													value={
														typeof row[colIdx] === "string"
															? row[colIdx]
															: ""
													}
													onChange={(e) => {
														setTableData((prev) =>
															prev.map((r, rIdx) =>
																rIdx === rowIdx
																	? r.map((cell, cIdx) =>
																			cIdx === colIdx
																				? e.target.value
																				: cell
																	  )
																	: r
															)
														);
													}}
													style={{
														width: "100%",
														border: "none",
														background: "transparent",
														color: appearance.text,
														outline: "none",
														fontFamily: font,
													}}
												/>
											)}
										</td>
									))}
									<td style={{ border: "none", background: "#fff" }}>
										{tableData.length > 1 && (
											<button
												type="button"
												onClick={() => {
													setNumRows(numRows - 1);
													setTableData(
														tableData.filter((_, idx) => idx !== rowIdx)
													);
													setRowTypes(rowTypes.filter((_, idx) => idx !== rowIdx));
												}}
												style={{
													background: "transparent",
													border: "none",
													color: appearance.accent,
													fontWeight: "bold",
													cursor: "pointer",
													fontSize: "1.2rem",
												}}
												title="Usuń wiersz"
											>
												×
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<button
						type="button"
						onClick={handleSaveTable}
						style={{
							marginTop: "2rem",
							background: appearance.accent,
							color: "#fff",
							border: "none",
							borderRadius: "0.5rem",
							padding: "0.7rem 2rem",
							fontWeight: "bold",
							fontSize: "1.1rem",
							cursor: "pointer",
							boxShadow: "0 2px 8px rgba(75,63,114,0.08)",
						}}
					>
						Zapisz plan
					</button>
				</div>
			</div>
		</div>
	);
};

export default Nowyplan;